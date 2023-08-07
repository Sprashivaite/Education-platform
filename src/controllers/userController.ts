import { Request, Response } from "express";
import User from "../models/user.js";

export const getUsers = async (_: Request, response: Response) => {
  try {
    const users = await User.find({});
    response.json(users);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Ошибка сервера" });
  }
};
