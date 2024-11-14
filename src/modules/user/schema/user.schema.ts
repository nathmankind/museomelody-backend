import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Role } from 'src/modules/auth/enums/role.enum';
import { commonSchemaSettings } from 'src/utils/helpers';

@Schema({ versionKey: false, timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: Role, default: Role.USER })
  role: Role;

  @Prop({ type: Boolean })
  isVerified: boolean;
}

const UserSchema = SchemaFactory.createForClass(User);
commonSchemaSettings(UserSchema);
export { UserSchema };
