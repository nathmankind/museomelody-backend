import { Body, Controller, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dtos/register.dto';
import { VerifyEmailDto } from './dtos/verifyEmail.dto';
import { ForgotPasswordDto } from './dtos/forgotPassword.dto';
import { VerifyPasswordResetDto } from './dtos/verifyPasswordResetLink.dto';
import { ResetPasswordDto } from './dtos/resetPassword.dto';
import { LoginDto } from './dtos/login.dto';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('Auth')
@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('verify-email')
  verify(@Body() verifyEmailDto: VerifyEmailDto) {
    return this.authService.verifyEmail(verifyEmailDto);
  }

  @Post('forgot-password')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPwd(forgotPasswordDto);
  }

  @Post('verify-password-reset-Link')
  verifyResetLink(@Body() verifyPwdResetLink: VerifyPasswordResetDto) {
    return this.authService.verifyResetLink(verifyPwdResetLink);
  }

  @Patch('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
