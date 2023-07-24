import mongoose, { Schema, Document } from "mongoose";

export interface ICourse extends Document {
  title: string;
  description: string;
}

const courseSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.model<ICourse>("Course", courseSchema);
