import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { commonSchemaSettings } from 'src/utils/helpers';

@Schema()
class RegisterUsers {
  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  userId: string;
}

const RegisterUsersSchema = SchemaFactory.createForClass(RegisterUsers);
commonSchemaSettings(RegisterUsersSchema);

@Schema({ versionKey: false, timestamps: true })
export class Event extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  location: string;

  @Prop({ default: false })
  isVirtual: boolean;

  @Prop({ default: null })
  imageUrl: string;

  @Prop({ default: null })
  mediaUrl: string;

  @Prop({ type: [RegisterUsersSchema], default: [] })
  registeredUsers: RegisterUsers[];
}

const EventSchema = SchemaFactory.createForClass(Event);
commonSchemaSettings(EventSchema);
export { EventSchema };
