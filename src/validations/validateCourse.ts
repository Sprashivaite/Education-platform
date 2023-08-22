import { check } from "express-validator";

export const validateCreateCourse = [
  check("title").notEmpty().withMessage("Название обязательно"),
  check("description").notEmpty().withMessage("Требуется описание"),
];
