import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { classRepository } from "../repositories/classRepository.js";
import { ErrorMessages } from "../types/errorMap.js";
import { courseRepository } from "../repositories/courceRepository.js";

export const requireAuthor = async (
  request: Request,
  response: Response,
  next: Function
) => {
  try {
    const { classId } = request.params;

    const classCreatedBy = await classRepository.findById(classId);

    if (
      request.userId &&
      classCreatedBy.createdBy._id.toString() === request.userId
    ) {
      next();
    } else {
      return response
        .status(httpStatus.FORBIDDEN)
        .json({ message: ErrorMessages.AccessForbidden });
    }
  } catch (error) {
    console.log(error);
    return response
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: "Сессия истекла. Пожалуйста авторизуйтесь" });
  }
};
