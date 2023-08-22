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

const router = Router();

router.get("/:courseId/classes", getClasses);

router.get("/:id", requireAuth, getClass);

router.get("/:id/:filename", requireAuth, uploadFile.single("file"), getFile);

router.get("/getVideo/:videoFileName", requireAuth, getVideo);

router.post(
  "/:courseId/classes",
  requireAuth,
  validateCreateClass,
  addClassToCourse
);

router.post("/:id/video", requireAuth, uploadFile.single("file"), addVideo);

router.post("/:id/file", requireAuth, uploadFile.single("file"), addFile);

router.post("/:id/comments", requireAuth, validateAddComment, addComment);

router.post(
  "/:classId/links",
  requireAuth,
  validateAddLinkToClass,
  addLinkToClass
);

router.post(
  "/:classId/links/files",
  requireAuth,
  validateAddLinkToClass,
  addLinkToFile
);

router.put("/:id", requireAuth, validateCreateClass, updateClass);

export default router;
