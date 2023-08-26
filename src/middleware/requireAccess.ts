import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { classRepository } from "../repositories/classRepository.js";
import { ErrorMessages } from "../types/errorMap.js";

export const requireAccess = async (
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
    } else if (
      request.userId &&
      classCreatedBy.grantedClassAccess.some(
        ({ _id }) => String(_id) === request.userId
      )
    ) {
      next();
    } else {
      return response
        .status(httpStatus.FORBIDDEN)
        .json({ message: ErrorMessages.AccessForbidden });
    }
  } catch (error) {
    next(error);
  }
};
