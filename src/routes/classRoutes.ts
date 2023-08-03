import { Router } from "express";
import { requireAuth } from "../controllers/userController.js";
import {
  addComment,
  addLinkToClass,
  addLinkToFile,
  getClass,
  getClasses,
} from "../controllers/classController.js";

const router = Router();

router.get("/:courseId/classes", requireAuth, getClasses);

router.get("/:id", requireAuth, getClass);

router.post("/:id/comments", requireAuth, addComment);

router.post("/:classId/links", requireAuth, addLinkToClass);

router.post("/:classId/links/files", requireAuth, addLinkToFile);

export default router;
