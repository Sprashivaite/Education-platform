import mongoose from "mongoose";
const username = "arkandos";
const password = "JU9KeV2zPbEV13HA";
const mongoURI = `mongodb+srv://${username}:${password}@cluster0.g8epamr.mongodb.net/?retryWrites=true&w=majority`;
export async function connectDB() {
    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected");
    }
    catch (error) {
        console.error(error);
    }
}
