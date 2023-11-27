import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getFileExtension } from "./helpers";
import { File } from "formidable";

export async function saveImageToFileSystem(file: File): Promise<string> {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const originalExtension = getFileExtension(file.mimetype || "image/png");
  const newFileName = file.newFilename + originalExtension;

  const publicFolderPath = path.join(__dirname, "..", "..", "public");
  const targetPath = path.join(publicFolderPath, newFileName);

  fs.rename(file.filepath, targetPath, (err: any) => {
    if (err) {
      throw err;
    }
  });

  return "/" + newFileName;
}
