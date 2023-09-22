import { Types } from "mongoose";
import httpStatus from "http-status-codes";
import { ErrorMessages } from "../types/errorMap.js";

export const validateUser = (request, response, next) => {
  const { userId } = request.params;

  if (!Types.ObjectId.isValid(userId)) {
    return response
      .status(httpStatus.BAD_REQUEST)
      .json({ message: ErrorMessages.InvalidRequestBody });
  }

  next();
};
