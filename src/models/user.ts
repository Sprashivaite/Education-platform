import mongoose, { Schema, Model } from "mongoose";
import bcrypt from "bcrypt";
import { MongooseCallback } from "../interfaces/mongoose";

interface IUser extends mongoose.Document {
  username: string;
  password: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
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
    } catch (err: any) {
      next(err);
    }
  }
);

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
