import multer, { FileFilterCallback } from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import { Request } from 'express';
import { env } from '../config/env';
import { ValidationError } from '../utils/errors';

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

const imageFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowed.includes(file.mimetype)) return cb(null, true);
  cb(new ValidationError('Only JPEG, PNG and WebP images are allowed'));
};

const documentFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowed = ['application/pdf', 'image/jpeg', 'image/png'];
  if (allowed.includes(file.mimetype)) return cb(null, true);
  cb(new ValidationError('Only PDF, JPEG and PNG files are allowed'));
};

const maxSize = env.MAX_FILE_SIZE_MB * 1024 * 1024;

export const uploadImage = multer({
  storage: multer.memoryStorage(),
  fileFilter: imageFilter,
  limits: { fileSize: maxSize },
});

export const uploadDocument = multer({
  storage: multer.memoryStorage(),
  fileFilter: documentFilter,
  limits: { fileSize: maxSize },
});

export async function uploadToCloudinary(buffer: Buffer, folder = 'jasorat-mfy'): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (err, result) => {
        if (err || !result) return reject(err ?? new Error('Cloudinary upload failed'));
        resolve(result.secure_url);
      },
    );
    Readable.from(buffer).pipe(stream);
  });
}
