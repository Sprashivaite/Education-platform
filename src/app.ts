import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/auth.js";
import { connectDB } from "./db/connectDB.js";
import cors from "cors";
import courseRoutes from "./routes/courseRoutes.js";
import classRoutes from "./routes/classRoutes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "client", "build");
app.use(express.static(publicPath));

app.use(cors());

connectDB();

app.get("/", (_, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});
app.use(express.json());

app.use("/auth", router);
app.use("/api/courses", courseRoutes);
app.use("/api/courses", classRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
