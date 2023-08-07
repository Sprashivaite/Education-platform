import { Request } from "express";
import jwt from "jsonwebtoken";
import { CallbackError } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      username: string;
    }
  }
}

declare module "jsonwebtoken" {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
    userId: string;
    username: string;
  }
}

export interface AuthenticatedRequest extends Request {
  userId: string;
  username: string;
}

export type MongooseCallback<T> = (
  error?: CallbackError | null,
  result?: T
) => void;
