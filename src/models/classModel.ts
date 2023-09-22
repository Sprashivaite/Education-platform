import { Schema, Document, Types, model } from "mongoose";

interface UsefulLink {
  title: string;
  url: string;
}

interface Comment {
  text: string;
  createdAt: Date;
  createdBy: string;
}

const usefulLinkSchema = new Schema({
  title: { type: String },
  url: { type: String },
});

const commentSchema = new Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: Types.ObjectId, ref: "User", required: true },
});

export interface IClass extends Document {
  title: string;
  description: string;
  courseId: Schema.Types.ObjectId;
  createdBy?: Types.ObjectId;
  usefulLinks?: UsefulLink[];
  comments?: Comment[];
  grantedClassAccess?: Types.ObjectId[];
  videoPath?: string;
  files?: string[];
}

const classSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  createdBy: { type: Types.ObjectId, ref: "User", required: true },
  usefulLinks: [usefulLinkSchema],
  comments: [commentSchema],
  grantedClassAccess: [{ type: Types.ObjectId, ref: "User" }],
  videoPath: { type: String },
  files: { type: Array },
});

export default model<IClass>("Class", classSchema);
