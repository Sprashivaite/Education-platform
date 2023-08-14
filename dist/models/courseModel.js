import mongoose, { Schema } from "mongoose";
const courseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    classes: [{ type: String }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
});
export default mongoose.model("Course", courseSchema);
