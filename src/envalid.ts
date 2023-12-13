import envalid, { str, num } from "envalid";
import { config } from "dotenv";

config();
export const env = envalid.cleanEnv(process.env, {
  EXPIRES_IN: str(),
  JWT_SECRET: str(),
  MONGO_URI: str(),
  PORT: num(),
});
