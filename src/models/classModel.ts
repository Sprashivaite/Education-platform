import { Schema, Document, Types, model } from "mongoose";

export interface IClass extends Document {
  title: string;
  description: string;
  videoUrl: string;
  courseId: Schema.Types.ObjectId;
  createdBy?: Types.ObjectId;
  usefulLinks?: {
    title: string;
    url: string;
    isFile?: boolean;
  }[];
  comments?: {
    text: string;
    createdAt: Date;
    createdBy: string;
  }[];
  grantedClassAccess?: Types.ObjectId[];
}

const classSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  createdBy: { type: Types.ObjectId, ref: "User", required: true },
  usefulLinks: [
    {
      title: { type: String, required: true },
      url: { type: String, required: true },
      isFile: { type: Boolean },
    },
  ],
  comments: [
    {
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      createdBy: { type: Types.ObjectId, ref: "User", required: true },
    },
  ],
  grantedClassAccess: [{ type: Types.ObjectId, ref: "Class" }],
});

export default model<IClass>("Class", classSchema);
