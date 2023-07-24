import { CallbackError } from "mongoose";

export type MongooseCallback<T> = (
  error?: CallbackError | null,
  result?: T
) => void;
