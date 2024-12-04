import { Body, Controller, Post } from '@nestjs/common';
import { SharedService } from './shared.service';
import { SendOtpDto } from './dtos/sendOtp.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../decorators/public.decorator';

@ApiTags('Shared')
@Public()
@Controller('shared')
export class SharedController {
  constructor(private readonly sharedService: SharedService) {}

  @Post('send-otp')
  sendotp(@Body() sendOtpDto: SendOtpDto) {
    return this.sharedService.sendOtp(sendOtpDto.email);
  }
}
