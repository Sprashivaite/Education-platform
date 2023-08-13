import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { JWT_SECRET } from "../consts.js";

export const requireAuth = (
  request: Request,
  response: Response,
  next: Function
) => {
  const token = request.headers.authorization?.split(" ")[1];
  if (!token) {
    return response.status(401).json({ message: "Вы не авторизованы" });
  }

  try {
    const { userId, username } = <jwt.UserIDJwtPayload>(
      jwt.verify(token, JWT_SECRET)
    );
    request.userId = userId;
    request.username = username;
    next();
  } catch (error) {
    console.log(error);
    return response
      .status(401)
      .json({ message: "Сессия истекла. Пожалуйста авторизуйтесь" });
  }
};
