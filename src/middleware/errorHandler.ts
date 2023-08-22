import httpStatus from "http-status-codes";
import { Response, Request } from "express";
import { ErrorMessages } from "../types/errorMap.js";
import winston from "winston";

const logger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

export const errorHandlerMiddleware = (
  _: Request,
  response: Response,
  error
) => {
  logger.error(error);
  response
    .status(httpStatus.INTERNAL_SERVER_ERROR)
    .json({ message: ErrorMessages.ServerError });
};
