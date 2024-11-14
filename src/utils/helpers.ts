import { Schema, Types } from 'mongoose';

function commonSchemaSettings(schema: Schema) {
  schema.virtual('id').get(function (this: { _id: Types.ObjectId }) {
    return this._id.toHexString();
  });

  schema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._id;
    },
  });

  schema.set('toObject', {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._id;
    },
  });
}

export { commonSchemaSettings };
