import express from "express";
import { getUsers, grantAccessToClass } from "../controllers/userController.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { validateClass } from "../validations/validateClass.js";
import { validateUser } from "../validations/validateUser.js";

const router = express.Router();

router.get("/", requireAuth, getUsers);

router.post(
  "/:userId/grant-access/:classId",
  requireAuth,
  validateClass,
  validateUser,
  grantAccessToClass
);

export default router;
