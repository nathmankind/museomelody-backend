import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '../auth/enums/role.enum';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import { ExtendApiReq } from '../../interfaces/common';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  profile(@Req() request: ExtendApiReq) {
    return this.userService.profile(request.user.userId);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get('/all')
  allUser() {
    return this.userService.getAllUser();
  }
}
