import { Router } from "express";
import {
  addClassToCourse,
  addComment,
  addFile,
  addLinkToClass,
  addLinkToFile,
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

router.get("/:id", requireAuth, requireAccess, getClass);

router.get(
  "/:id/:filename",
  requireAuth,
  requireAccess,
  uploadFile.single("file"),
  getFile
);

router.get("/getVideo/:videoFileName", requireAuth, requireAccess, getVideo);

router.post(
  "/:courseId/classes",
  requireAuth,
  requireAuthor,
  validateCreateClass,
  addClassToCourse
);

router.post(
  "/:id/video",
  requireAuth,
  requireAuthor,
  uploadFile.single("file"),
  addVideo
);

router.post(
  "/:id/file",
  requireAuth,
  requireAuthor,
  uploadFile.single("file"),
  addFile
);

router.post(
  "/:id/comments",
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

router.post(
  "/:classId/links/files",
  requireAuth,
  requireAuthor,
  validateAddLinkToClass,
  addLinkToFile
);

router.put(
  "/:id",
  requireAuth,
  requireAuthor,
  validateCreateClass,
  updateClass
);

export default router;
