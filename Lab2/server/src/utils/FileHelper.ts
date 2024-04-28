import fs from "fs/promises";
import path from "path";

export class FileHelper {
  static async removeFile(name: string) {
    await fs.unlink(path.resolve(__dirname, "..", "static", name));
  }
}
