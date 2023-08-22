import { Request, Response, NextFunction } from "express";
import User from "../models/user.js";
import Class from "../models/classModel.js";
import httpStatus from "http-status-codes";
import { ErrorMessages } from "../types/errorMap.js";

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

export const grantAccessToClass = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { classId, userId } = request.params;

  try {
    const user = await User.findById(userId);
    const classItem = await Class.findById(classId);

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
    classItem.grantedClassAccess.push(userId as any);
    await classItem.save();

    return response
      .status(httpStatus.OK)
      .json({ message: ErrorMessages.AccessGranted });
  } catch (error) {
    next(error);
  }
};
