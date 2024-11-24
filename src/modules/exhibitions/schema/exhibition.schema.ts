import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { commonSchemaSettings } from 'src/utils/helpers';

@Schema({ versionKey: false, timestamps: true })
export class Exhibition extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  description: string;

  @Prop()
  imageUrl: string;

  @Prop()
  mediaUrl: string;
}

const ExhibitionSchema = SchemaFactory.createForClass(Event);
commonSchemaSettings(ExhibitionSchema);
export { ExhibitionSchema };
