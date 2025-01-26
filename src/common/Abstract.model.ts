import { prop, modelOptions } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
export abstract class AbstractModel {
  @prop({ type: String })
  public id!: string;

  @prop({ type: Date, default: Date.now })
  public createdAt?: Date;

  @prop({ type: Date })
  public updatedAt?: Date;
}
