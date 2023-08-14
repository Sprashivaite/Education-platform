import mongoose, { Schema } from "mongoose";
const classSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User", required: true },
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
            createdBy: { type: mongoose.Types.ObjectId, ref: "User", required: true },
        },
    ],
});
export default mongoose.model("Class", classSchema);
