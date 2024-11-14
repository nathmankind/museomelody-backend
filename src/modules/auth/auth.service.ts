import {
  BadRequestException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/schema/user.schema';
import { isValidObjectId, Model } from 'mongoose';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcrypt';
import { UtilService } from 'src/services/utils.service';
import { SharedService } from '../shared/shared.service';
import { VerifyEmailDto } from './dtos/verifyEmail.dto';
import { JwtService } from '@nestjs/jwt';
import { ForgotPasswordDto } from './dtos/forgotPassword.dto';
import { MailService } from 'src/services/mail.service';
import { VerifyPasswordResetDto } from './dtos/verifyPasswordResetLink.dto';
import { ResetPasswordDto } from './dtos/resetPassword.dto';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,

    //services
    private utilService: UtilService,
    private sharedService: SharedService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, username, password } = registerDto;
    const [emailExist, usernameExist] = await Promise.all([
      this.findUserByEmail(email),
      this.findUserByUsername(username),
    ]);
    if (emailExist) {
      throw new BadRequestException('Email already exist');
    }
    if (usernameExist) {
      throw new BadRequestException('Username already exist');
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await this.UserModel.create({
      ...registerDto,
      role: 'user',
      isVerified: false,
      password: hashPassword,
    });

    this.sharedService.sendOtp(email);
    return this.utilService.successResponseHandler(
      'Registration Successful',
      HttpStatus.CREATED,
    );
  }

  async verifyEmail(verifyEmailDto: VerifyEmailDto) {
    const { email, otp } = verifyEmailDto;
    const verify = await this.utilService.verifyOTP(
      verifyEmailDto.otp,
      verifyEmailDto.email,
    );

    if (!verify) {
      throw new BadRequestException('Invalid OTP');
    }

    const user = await this.UserModel.findOne({ email });

    if (!user) {
      throw new BadRequestException('Email not found');
    }

    if (user.isVerified) {
      throw new BadRequestException('Email already verified');
    }

    user.isVerified = true;
    await user.save();
    const token = await this.generateUserToken(user.email, user.id);
    return this.utilService.successResponseHandler(
      'Email verified successfully',
      HttpStatus.OK,
      token,
    );
  }

  async forgotPwd(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;
    const user = await this.findUserByEmail(email);

    if (user) {
      const resetToken = this.jwtService.sign(
        { userId: user.id, email: user.email },
        { expiresIn: '10m' },
      );
      this.mailService.sendPasswordResetEmail(email, resetToken);
    }

    return this.utilService.successResponseHandler(
      'Reset link has been sent',
      HttpStatus.OK,
    );
  }

  async verifyResetLink(verifyPwdResetLink: VerifyPasswordResetDto) {
    const { token } = verifyPwdResetLink;
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.findUserByEmail(payload.email);
      if (user) {
        return this.utilService.successResponseHandler(
          'Reset link verified',
          HttpStatus.OK,
          payload,
        );
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid Access Token');
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { userId, password } = resetPasswordDto;
    const user = await this.findUserById(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;

    await user.save();
    return this.utilService.successResponseHandler(
      'Password reset successfully',
      HttpStatus.OK,
    );
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    if (!user.isVerified) {
      const additionalInfo = {
        reason: 'Email not verified',
        email: user.email,
        isVerified: false,
      };
      throw new UnauthorizedException(additionalInfo);
    }
    const token = await this.generateUserToken(user.email, user.id);
    return this.utilService.successResponseHandler(
      'Login Successfully',
      HttpStatus.OK,
      token,
    );
  }

  //MISCS
  async findUserByEmail(email: string) {
    const user = await this.UserModel.findOne({ email });
    return user;
  }

  async findUserById(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid user Id');
    }
    const user = await this.UserModel.findById(id);
    return user;
  }

  async findUserByUsername(username: string) {
    const user = await this.UserModel.findOne({ username });
    return user;
  }

  async generateUserToken(email: string, id: string) {
    const accessToken = this.jwtService.sign({
      userId: id,
      email: email,
    });
    return { accessToken };
  }
}
