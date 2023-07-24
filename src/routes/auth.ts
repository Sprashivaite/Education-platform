import express, { Request, Response } from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();
const JWT_SECRET = "some_key";

router.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        errors: [
          {
            type: "field",
            msg: "Username already exists",
            path: "username",
            location: "body",
          },
        ],
      });
    }

    const user = new User({ username, password });

    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    res
      .status(201)
      .json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      errors: [
        { type: "server", msg: "Internal server error", location: "server" },
      ],
    });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Неверные учетные данные" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Ошибка регистрации в журнале" });
  }
});

export default router;
