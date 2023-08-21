import { Request, Response, NextFunction } from "express";
import User from "../models/user.js";

export const getUsers = async (
  _: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({});
    response.json(users);
  } catch (error) {
    next(error);
  }
};
