import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpCode, OtpCodeSchema } from 'src/modules/auth/schema/otp.schema';
import { SharedService } from 'src/modules/shared/shared.service';
import { User, UserSchema } from 'src/modules/user/schema/user.schema';
import { MailService } from 'src/services/mail.service';
import { UtilService } from 'src/services/utils.service';

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
