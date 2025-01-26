import { getModelForClass, pre, prop } from '@typegoose/typegoose';
import bcrypt from 'bcrypt';
import { AbstractModel } from '../../common/Abstract.model.js';

export enum Role {
  User = 'user',
  Admin = 'admin',
}

@pre<User>('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
})
export class User extends AbstractModel {
  @prop({ type: String, required: true, unique: true })
  public username!: string;

  @prop({ type: String, required: true, unique: true })
  public email!: string;

  @prop({ type: String, required: true })
  public password!: string;

  @prop({ type: String, enum: Role, default: Role.User })
  public role!: Role;
}

export const UserModel = getModelForClass(User);
