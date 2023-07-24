import express, { Request, Response } from "express";
import Course from "../models/courseModel.js";

const router = express.Router();

router.get("/", async (_: Request, res: Response) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

export default router;
