import express from "express";
import path from "path";
import cors from "cors";

import router from "./routes/auth.js";
import { connectDB } from "./db/connectDB.js";
import courseRoutes from "./routes/courseRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { port, publicPath } from "./consts.js";

connectDB();

express()
  .use(express.static(publicPath))
  .use(cors())
  .use(express.json())
  .get("/", (_, response) => {
    response.sendFile(path.join(publicPath, "index.html"));
  })
  .use("/auth", router)
  .use("/api/users", userRoutes)
  .use("/api/courses", courseRoutes)
  .use("/api/classes", classRoutes)
  .listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
