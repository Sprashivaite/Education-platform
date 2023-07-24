import mongoose, { Schema, Document } from "mongoose";

export interface IClass extends Document {
  title: string;
  description: string;
  videoUrl: string;
  courseId: Schema.Types.ObjectId;
}

const classSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
});

export default mongoose.model<IClass>("Class", classSchema);
