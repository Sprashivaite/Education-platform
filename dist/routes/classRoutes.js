import express from "express";
import Class from "../models/classModel.js";
import { requireAuth } from "./courseRoutes.js";
import {
  addLinkToClass,
  addLinkToFile,
} from "../controllers/classController.js";
const router = express.Router();
router.get("/:courseId/classes", async (req, res) => {
  const { courseId } = req.params;
  try {
    const classes = await Class.find({ courseId });
    res.json(classes);
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Ошибка сервера" });
  }
});
router.get("/:id", async (req, res) => {
  const classId = req.params.id;
  try {
    const classDetail = await Class.findById(classId);
    if (!classDetail) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Class not found" });
    }
    if (req.userId && classDetail.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: "Access denied" });
    }
    return res.json(classDetail);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Error fetching class details" });
  }
});
router.post("/:id/comments", requireAuth, async (req, res) => {
  const classId = req.params.id;
  const { text } = req.body;
  try {
    const classDetail = await Class.findById(classId);
    if (!classDetail) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Class not found" });
    }
    console.log(req.userId);
    classDetail.comments.push({
      text,
      createdBy: req.userId,
      createdAt: new Date(),
    });
    console.log("object");
    const updatedClass = await classDetail.save();
    return res.json(updatedClass);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Error adding comment" });
  }
});
router.post("/:classId/links", addLinkToClass);
router.post("/:classId/links/files", addLinkToFile);
export default router;
