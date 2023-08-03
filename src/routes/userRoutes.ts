import express from "express";
import { grantAccessToClass } from "../controllers/classController.js";
import { getUsers, requireAuth } from "../controllers/userController.js";

const router = express.Router();

router.get("/", requireAuth, getUsers);

router.post("/:userId/grant-access/:classId", grantAccessToClass);

export default router;
