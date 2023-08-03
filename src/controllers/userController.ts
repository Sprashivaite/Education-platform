import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../consts.js";
import { AuthenticatedRequest } from "../types/express";
import User from "../models/user.js";

export const requireAuth = (
  request: AuthenticatedRequest,
  response: Response,
  next: Function
) => {
  const token = request.headers.authorization?.split(" ")[1];
  if (!token) {
    return response.status(401).json({ message: "Вы не авторизованы" });
  }

  try {
    const { userId } = <jwt.UserIDJwtPayload>jwt.verify(token, JWT_SECRET);
    request.userId = userId;
    next();
  } catch (error) {
    console.log(error);
    next();
  }
};

export const getUsers = async (_: Request, response: Response) => {
  try {
    const users = await User.find({});
    response.json(users);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Ошибка сервера" });
  }
};
