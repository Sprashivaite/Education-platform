import { Router } from "express";
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
} from "../controllers/courseController.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { validateCreateCourse } from "../validations/validateCourse.js";

const router = Router();

router.get("/", getCourses);

router.get("/:id", getCourseById);

router.put("/:id", requireAuth, validateCreateCourse, updateCourse);

router.post("/", requireAuth, validateCreateCourse, createCourse);

export default router;
