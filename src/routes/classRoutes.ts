import { Router } from "express";
import {
  addClassToCourse,
  addComment,
  addLinkToClass,
  addLinkToFile,
  getClass,
  getClasses,
} from "../controllers/classController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.get("/:courseId/classes", getClasses);

router.get("/:id", requireAuth, getClass);

router.post("/:courseId/classes", requireAuth, addClassToCourse);

router.post("/:id/comments", requireAuth, addComment);

router.post("/:classId/links", requireAuth, addLinkToClass);

router.post("/:classId/links/files", requireAuth, addLinkToFile);

export default router;
