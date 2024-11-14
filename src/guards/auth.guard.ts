import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';
import { ExtendApiReq } from 'src/interfaces/common';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: ExtendApiReq = context.switchToHttp().getRequest();

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = this.jwtService.verify(token); // verify and decode the token
      const user = await this.authService.findUserById(payload.userId); // make async

      if (!user) {
        throw new NotFoundException('User not found');
      }

      request.user = {
        userId: user.id,
        email: user.email,
        role: user.role,
      };
    } catch (error) {
      Logger.error(error.message);
      throw new UnauthorizedException();
    }

    return true;
  }

  // Method to extract token from the header
  private extractTokenFromHeader(request: Request): string | undefined {
    return request.headers.authorization?.split(' ')[1];
  }
}
