import { getModelForClass, prop, PropType } from '@typegoose/typegoose';
import { AbstractModel } from '../../common/Abstract.model';
import { User } from '../../User/models/User.model';
import { Schema } from 'mongoose';

export class Image {
  @prop({ type: String, required: true })
  public url!: string;
}

export class TaskSubmission extends AbstractModel {
  @prop({ type: String, required: true })
  public name!: string;

  @prop({ type: String, required: true })
  public socialMediaHandle!: string;

  @prop({ type: Image }, PropType.ARRAY)
  public images?: Image[];

  @prop({ type: Schema.Types.ObjectId, required: true, ref: () => User })
  public userId!: string;
}

export const TaskSubmissionModel = getModelForClass(TaskSubmission);
