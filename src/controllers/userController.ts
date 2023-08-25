import { Request, Response, NextFunction } from "express";
import User from "../models/user.js";
import Class from "../models/classModel.js";
import httpStatus from "http-status-codes";
import { ErrorMessages } from "../types/errorMap.js";
import { userRepository } from "../repositories/userRepository.js";
import { classRepository } from "../repositories/classRepository.js";

export const getUsers = async (
  _: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const users = await userRepository.findByAll();
    response.json(users);
  } catch (error) {
    next(error);
  }
};

export const grantAccessToClass = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { classId, userId } = request.params;

  try {
    const user = await userRepository.findById(userId);
    const classItem = await classRepository.findById(classId);

    if (
      request.userId &&
      classItem.createdBy._id.toString() !== request.userId
    ) {
      return response
        .status(httpStatus.FORBIDDEN)
        .json({ message: ErrorMessages.AccessForbidden });
    }

    if (!user) {
      return response
        .status(httpStatus.NOT_FOUND)
        .json({ message: ErrorMessages.UserNotFound });
    }

    if (
      classItem.grantedClassAccess.some(({ _id }) => userId === _id.toString())
    ) {
      return response
        .status(httpStatus.CONFLICT)
        .json({ message: ErrorMessages.ClassAlreadyAssigned });
    }
    await classRepository.addAccess(classItem, userId);

    return response
      .status(httpStatus.OK)
      .json({ message: ErrorMessages.AccessGranted });
  } catch (error) {
    next(error);
  }
};
