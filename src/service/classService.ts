import path from "path";
import fs from "fs";

export const classService = {
  getVideo(videoFileName: string) {
    const idx = videoFileName.indexOf(".") + 1;
    const subdirectory = videoFileName.substring(idx);

    const videoPath = path.join("src/files", subdirectory, videoFileName);
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;

    const file = fs.createReadStream(videoPath);
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };
    return { file, head };
  },
  getFile(filename: string) {
    const idx = filename.indexOf(".") + 1;
    const subdirectory = filename.substring(idx);

    const filePath = path.join("src/files", subdirectory, filename);
    return filePath;
  },
};
