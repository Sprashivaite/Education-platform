import express from "express";
import Course from "../models/courseModel.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./auth.js";
const router = express.Router();
export const requireAuth = (req, res, next) => {
  var _a;
  const token =
    (_a = req.headers.authorization) === null || _a === void 0
      ? void 0
      : _a.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const { userId } = jwt.verify(token, JWT_SECRET);
    req.userId = userId;
    next();
  } catch (error) {
    console.log(error);
    next();
  }
};
router.get("/", async (_, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Ошибка сервера" });
  }
});
router.get("/:id", requireAuth, async (req, res) => {
  const courseId = req.params.id;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Course not found" });
    }
    if (req.userId !== course.createdBy._id.toString()) {
      return res.status(403).json({
        message: "Access denied: You are not the owner of this course",
      });
    }
    return res.json(course);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Error fetching course details" });
  }
});
router.post("/", async (req, res) => {
  try {
    const { title, description, createdBy, classes } = req.body;
    const newCourseData = {
      title,
      description,
      createdBy,
      classes,
    };
    const newCourse = new Course(newCourseData);
    const savedCourse = await newCourse.save();
    res.status(httpStatus.CREATED).json(savedCourse);
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Ошибка сервера" });
  }
});
router.put("/:id", requireAuth, async (req, res) => {
  const courseId = req.params.id;
  const { title, description, classes } = req.body;
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { title, description, classes },
      { new: true }
    );
    if (!updatedCourse) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Course not found" });
    }
    return res.json(updatedCourse);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Error updating course" });
  }
});
export default router;
