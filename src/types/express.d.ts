import { Request } from "express";
import jwt from "jsonwebtoken";
import { CallbackError } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

declare module "jsonwebtoken" {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
    userId: string;
  }
}

export interface AuthenticatedRequest extends Request {
  userId: string;
}

export type MongooseCallback<T> = (
  error?: CallbackError | null,
  result?: T
) => void;
