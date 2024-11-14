import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { ExtendApiReq } from 'src/interfaces/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  profile(@Req() request: ExtendApiReq) {
    return this.userService.profile(request.user.userId);
  }
}
