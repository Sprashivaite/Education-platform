import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { env } from "../envalid.js";

export const requireAuth = (
  request: Request,
  response: Response,
  next: Function
) => {
  const token = request.headers.authorization?.split(" ")[1];
  if (!token) {
    return response
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: "Вы не авторизованы" });
  }

  try {
    const { userId, username } = <jwt.UserIDJwtPayload>(
      jwt.verify(token, env.JWT_SECRET)
    );
    request.userId = userId;
    request.username = username;
    next();
  } catch (error) {
    console.log(error);
    return response
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: "Сессия истекла. Пожалуйста авторизуйтесь" });
  }
};
