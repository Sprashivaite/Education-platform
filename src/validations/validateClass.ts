import { Types } from "mongoose";
import httpStatus from "http-status-codes";
import { ErrorMessages } from "../types/errorMap.js";
import { check } from "express-validator";

export const validateClass = (request, response, next) => {
  const { classId } = request.params;

  if (!Types.ObjectId.isValid(classId)) {
    return response
      .status(httpStatus.BAD_REQUEST)
      .json({ message: ErrorMessages.InvalidRequestBody });
  }

  next();
};

export const validateCreateClass = [
  check("title").notEmpty().withMessage("Название обязательно"),
  check("description").notEmpty().withMessage("Требуется описание"),
];

export const validateAddComment = [
  check("text").notEmpty().withMessage(ErrorMessages.CommentNotAdded),
];

export const validateAddLinkToClass = [
  check("title").notEmpty().withMessage("Заголовок ссылки обязателен"),
  check("url")
    .notEmpty()
    .withMessage("Требуется URL ссылки")
    .isURL()
    .withMessage("Недопустимый формат URL"),
];
