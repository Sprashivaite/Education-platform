import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import { env } from "../envalid.js";
import httpStatus from "http-status-codes";
import { ErrorMessages } from "../types/errorMap.js";
import { validationResult } from "express-validator";
import { userRepository } from "../repositories/userRepository.js";

export const registerUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response
      .status(httpStatus.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  const { username, password } = request.body;

  try {
    const existingUser = await userRepository.findByName(username);

    if (existingUser) {
      return response.status(httpStatus.CONFLICT).json({
        message: ErrorMessages.UserConflict,
      });
    }
    const user = await userRepository.addUser(username, password);

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      env.JWT_SECRET
    );

    response
      .status(httpStatus.CREATED)
      .json({ token, user: { id: user._id, username: user.username } });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { username, password } = request.body;
  try {
    const user = await userRepository.findByName(username);
    if (!user) {
      return response
        .status(httpStatus.NOT_FOUND)
        .json({ message: ErrorMessages.UserNotFound });
    }

    const userId = user._id;

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return response
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: ErrorMessages.InvalidPassword });
    }

    const token = jwt.sign({ userId }, env.JWT_SECRET, {
      expiresIn: env.EXPIRES_IN,
    });

    response.status(httpStatus.OK).json({ token, userId });
  } catch (error) {
    next(error);
  }
};
