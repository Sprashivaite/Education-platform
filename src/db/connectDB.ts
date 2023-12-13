import mongoose from "mongoose";
import { env } from "../envalid.js";

export async function connectDB() {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
  }
}
