import { Router } from "express";
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
} from "../controllers/courseController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.get("/", getCourses);

router.get("/:id", getCourseById);

router.put("/:id", requireAuth, updateCourse);

router.post("/", requireAuth, createCourse);

export default router;
