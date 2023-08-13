export const port = process.env.PORT || 3001;
import path from "path";
import { fileURLToPath } from "url";

export const JWT_SECRET = "some_key";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
export const publicPath = path.join(__dirname, "client", "build");
