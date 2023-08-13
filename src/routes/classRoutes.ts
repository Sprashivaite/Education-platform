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

const router = Router();

router.get("/:courseId/classes", getClasses);

router.get("/:id", requireAuth, getClass);

router.get("/:id/:filename", uploadFile.single("file"), getFile);

router.get("/getVideo/:videoFileName", getVideo);

router.post("/:courseId/classes", requireAuth, addClassToCourse);

router.post("/:id/video", requireAuth, uploadFile.single("file"), addVideo);

router.post("/:id/file", requireAuth, uploadFile.single("file"), addFile);

router.post("/:id/comments", requireAuth, addComment);

router.post("/:classId/links", requireAuth, addLinkToClass);

router.post("/:classId/links/files", requireAuth, addLinkToFile);

router.put("/:id", requireAuth, updateClass);

export default router;
