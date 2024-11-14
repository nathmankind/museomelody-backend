import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { commonSchemaSettings } from 'src/utils/helpers';

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

  @Prop({ type: Boolean })
  isVirtual: boolean;
}

const EventSchema = SchemaFactory.createForClass(Event);
commonSchemaSettings(EventSchema);
export { EventSchema };
