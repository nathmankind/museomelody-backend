import { Injectable } from '@nestjs/common';
import { MailService } from '../../services/mail.service';
import { UtilService } from '../../services/utils.service';


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
