import { Schema, Model, Document, model } from "mongoose";
import bcrypt from "bcrypt";
import { MongooseCallback } from "../types/express";

interface IUser extends Document {
  username: string;
  password: string;
}

const userSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre(
  "save",
  async function (this: IUser, next: MongooseCallback<void>) {
    if (!this.isModified("password")) {
      return next();
    }

    try {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
      next(null);
    } catch (error: any) {
      next(error);
    }
  }
);

const User: Model<IUser> = model<IUser>("User", userSchema);

export default User;
