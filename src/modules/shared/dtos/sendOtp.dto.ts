import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SendOtpDto {
  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;
}
