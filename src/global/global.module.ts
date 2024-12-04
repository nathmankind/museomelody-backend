import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../modules/user/schema/user.schema';
import { OtpCode, OtpCodeSchema } from '../modules/auth/schema/otp.schema';
import { SharedService } from '../modules/shared/shared.service';
import { MailService } from '../services/mail.service';
import { UtilService } from '../services/utils.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      {
        name: OtpCode.name,
        schema: OtpCodeSchema,
      },
    ]),
  ],
  providers: [SharedService, UtilService, MailService],
  exports: [MongooseModule, SharedService, UtilService, MailService],
})
export class GlobalModule {}
