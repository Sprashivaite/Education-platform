import { Router } from "express";
import {
  addClassToCourse,
  addComment,
  addFile,
  addLinkToClass,
  addVideo,
  getClass,
  getClasses,
  getFile,
  getVideo,
  updateClass,
} from "../controllers/classController.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { uploadFile } from "../middleware/manageFile.js";
import {
  validateAddComment,
  validateAddLinkToClass,
  validateCreateClass,
} from "../validations/validateClass.js";
import { requireAuthor } from "../middleware/requireAuthor.js";
import { requireAccess } from "../middleware/requireAccess.js";

const router = Router();

router.get("/:courseId/classes", getClasses);

router.get("/:classId", requireAuth, requireAccess, getClass);

router.get(
  "/:classId/:filename",
  requireAuth,
  requireAccess,
  uploadFile.single("file"),
  getFile
);

router.get(
  "/getVideo/:classId/:videoFileName",
  requireAuth,
  requireAccess,
  getVideo
);

router.post(
  "/:courseId/classes",
  requireAuth,
  validateCreateClass,
  addClassToCourse
);

router.post(
  "/:classId/video",
  requireAuth,
  requireAuthor,
  uploadFile.single("file"),
  addVideo
);

router.post(
  "/:classId/file",
  requireAuth,
  requireAuthor,
  uploadFile.single("file"),
  addFile
);

router.post(
  "/:classId/comments",
  requireAuth,
  requireAccess,
  validateAddComment,
  addComment
);

router.post(
  "/:classId/links",
  requireAuth,
  requireAuthor,
  validateAddLinkToClass,
  addLinkToClass
);

router.put(
  "/:classId",
  requireAuth,
  requireAuthor,
  validateCreateClass,
  updateClass
);

export default router;
