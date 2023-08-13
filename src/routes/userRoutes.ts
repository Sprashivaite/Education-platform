import express from "express";
import { grantAccessToClass } from "../controllers/classController.js";
import { getUsers } from "../controllers/userController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

router.get("/", requireAuth, getUsers);

router.post("/:userId/grant-access/:classId", requireAuth, grantAccessToClass);

export default router;
