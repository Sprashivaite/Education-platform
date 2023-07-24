import express, { Request, Response } from "express";
import Class from "../models/classModel.js";

const router = express.Router();

router.get("/:courseId/classes", async (req: Request, res: Response) => {
  const { courseId } = req.params;
  try {
    const classes = await Class.find({ courseId });
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

export default router;
