// mail.service.ts
import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'johnoliver6p@gmail.com',
        pass: 'zvlorbrzoxyxvkzb',
      },
    });
  }

  async sendPasswordResetEmail(to: string, token: string) {
    const resetLink = `http://localhost:3003/auth/reset-password?token=${token}`;
    const mailOptions = {
      from: 'Auth-backend service',
      to: to,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click the link below to reset your password:</p>
        <button styles={backgroundColor:"purple", color:"white" padding:"6px", border-radius:"6px"}><p></p><a href="${resetLink}">Reset Password</a></p></button>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendOtpCode(to: string, code: number) {
    const mailOptions = {
      from: 'Auth-backend service',
      to: to,
      subject: 'Verification Code',
      html: `<p>Your verification code is: <b>${code}</b></p>`,
    };
    await this.transporter.sendMail(mailOptions);
  }

  async sendEventRegistrationEmail(
    to: string,
    eventName: string,
    eventDate: string,
    username: string,
  ) {
    const mailOptions = {
      from: 'Museomelody',
      to: to,
      subject: 'Event Registration successful',
      html: `
      <div>
        <p>Hello ${username},</p>
        <p>You have successfully registered for the event: <b>${eventName}</b></p>
        <p>Event Date: ${eventDate}</p>
        <p>Thank you for registering!</p>
      </div>
      `,
    };
    await this.transporter.sendMail(mailOptions);
  }
}
