import { Router } from "express";
import { requireAuth } from "../controllers/userController.js";
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
} from "../controllers/courseController.js";

const router = Router();

router.get("/", getCourses);

router.get("/:id", requireAuth, getCourseById);

router.put("/:id", requireAuth, updateCourse);

router.post("/", createCourse);

export default router;
