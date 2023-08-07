import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import { JWT_SECRET } from "../consts.js";

export const registerUser = async (request: Request, response: Response) => {
  const { username, password } = request.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return response.status(409).json({
        message: "Пользователь с таким именем уже существует",
      });
    }

    const user = new User({ username, password });

    await user.save();

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET
    );

    response
      .status(201)
      .json({ token, user: { id: user._id, username: user.username } });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

export const loginUser = async (request: Request, response: Response) => {
  const { username, password } = request.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return response.status(404).json({ message: "Пользователь не найден" });
    }

    const userId = user._id;

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return response.status(401).json({ message: "Неверные пароль" });
    }

    const token = jwt.sign({ userId }, JWT_SECRET, {
      expiresIn: "1h",
    });

    response.status(200).json({ token, userId });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Ошибка регистрации в журнале" });
  }
};
