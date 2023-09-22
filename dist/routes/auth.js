import express from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const router = express.Router();
export const JWT_SECRET = "some_key";
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        error: {
          type: "field",
          msg: "Пользователь с таким именем уже существует",
          path: "username",
          location: "body",
        },
      });
    }
    const user = new User({ username, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res
      .status(httpStatus.CREATED)
      .json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      errors: [
        { type: "server", msg: "Internal server error", location: "server" },
      ],
    });
  }
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: ErrorMessages.UserNotFound });
    }
    const userId = user._id;
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Неверные учетные данные" });
    }
    const token = jwt.sign({ userId }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token, userId });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Ошибка регистрации в журнале" });
  }
});
export default router;
