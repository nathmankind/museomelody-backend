import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { commonSchemaSettings } from 'src/utils/helpers';

@Schema({ versionKey: false, timestamps: true })
export class OtpCode extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  expiresAt: Date;
}

const OtpCodeSchema = SchemaFactory.createForClass(OtpCode);
commonSchemaSettings(OtpCodeSchema);
export { OtpCodeSchema };
