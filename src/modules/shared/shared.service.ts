import { Injectable } from '@nestjs/common';
import { UtilService } from 'src/services/utils.service';
import { MailService } from 'src/services/mail.service';

@Injectable()
export class SharedService {
  constructor(
    private utilService: UtilService,
    private mailService: MailService
  ) {}

  async sendOtp(email: string) {
    const otp = await this.utilService.generateOTP(email);
    this.mailService.sendOtpCode(email, otp);
  }
}
