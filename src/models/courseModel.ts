import { Schema, Types, model } from "mongoose";

interface IUser {
  _id: string;
  username: string;
}

export interface ICourse {
  title: string;
  description: string;
  classes?: Types.ObjectId[];
  createdBy: IUser;
}

const courseSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  classes: [{ type: Types.ObjectId, ref: "Class" }],
  createdBy: { type: Types.ObjectId, ref: "User", required: true },
});

export default model<ICourse>("Course", courseSchema);
