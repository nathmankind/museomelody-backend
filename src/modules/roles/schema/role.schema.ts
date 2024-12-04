import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Resource } from '../enum/resource.enum';
import { Action } from '../enum/action.enum';
import { commonSchemaSettings } from '../../../utils/helpers';

@Schema()
class Permission {
  @Prop({ required: true, enum: Resource })
  resource: Resource;

  @Prop({ type: [{ type: String, enum: Action }] })
  actions: Action[];
}

@Schema()
export class Role {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: [Permission] })
  permissions: Permission[];
}

const RoleSchema = SchemaFactory.createForClass(Role);
commonSchemaSettings(RoleSchema);
export { RoleSchema };
