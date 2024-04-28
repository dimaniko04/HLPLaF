import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

import { ApiError } from "../exceptions/apiError";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "..", "static"));
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    cb(null, uuidv4() + fileExtension);
  },
});

const MEGABYTE_SIZE = 1_000_000;
const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"];
const ALLOWED_FILE_EXTENSIONS = [".png", ".jpeg", ".jpg"];

export const multerMiddleware = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (ALLOWED_FILE_TYPES.includes(file.mimetype)) {
      cb(null, true);
      return;
    }
    const errorMsg = `Unsupported file type! Supported file extensions are ${ALLOWED_FILE_EXTENSIONS.join(
      ", "
    )}`;
    cb(ApiError.UnsupportedMedia(errorMsg));
  },
  limits: { fileSize: 5 * MEGABYTE_SIZE },
});
