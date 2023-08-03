import express from "express";
import path from "path";
import cors from "cors";

import router from "./routes/auth.js";
import { connectDB } from "./db/connectDB.js";
import courseRoutes from "./routes/courseRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { publicPath } from "./utils.js";
import { port } from "./consts.js";

connectDB();

const app = express();
app.use(express.static(publicPath)).use(cors()).use(express.json());

app
  .use("/auth", router)
  .use("/api/users", userRoutes)
  .use("/api/courses", courseRoutes)
  .use("/api/classes", classRoutes);

app.get("/", (_, response) => {
  response.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
