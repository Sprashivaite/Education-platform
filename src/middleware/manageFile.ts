import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (_, file, cb) {
    const extension = path.extname(file.originalname).toLowerCase();
    const subdirectory = extension.startsWith(".")
      ? extension.substring(1)
      : "other";

    const directoryPath = path.join("src/files", subdirectory);
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }
    cb(null, directoryPath);
  },
  filename: function (_, file, cb) {
    cb(null, path.basename(file.originalname));
  },
});

export const uploadFile = multer({ storage });
