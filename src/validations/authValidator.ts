import { check } from "express-validator";

export const validateRegistration = [
  check("username").notEmpty().withMessage("Имя пользователя обязательно"),
  check("password").notEmpty().withMessage("Требуется пароль"),
];
