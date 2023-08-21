import mongoose from "mongoose";
import { env } from "../envalid.js";

const mongoURI = `mongodb+srv://${env.USER}:${env.PASSWORD}@cluster0.g8epamr.mongodb.net/?retryWrites=true&w=majority`;

export async function connectDB() {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
  }
}
