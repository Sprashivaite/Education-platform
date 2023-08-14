import express from "express";
import path from "path";
import router from "./routes/auth.js";
import { connectDB } from "./db/connectDB.js";
import cors from "cors";
import courseRoutes from "./routes/courseRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { publicPath } from "./utils.js";
const app = express();
app.use(express.static(publicPath));
app.use(cors());
app.use(express.json());
connectDB();
app.get("/", (_, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});
app.use("/auth", router);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/classes", classRoutes);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
