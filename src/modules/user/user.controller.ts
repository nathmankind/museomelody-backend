import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ExtendApiReq } from 'src/interfaces/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';

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
