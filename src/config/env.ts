import dotenv from 'dotenv';
dotenv.config();

function required(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env variable: ${key}`);
  return value;
}

function optional(key: string, fallback: string): string {
  return process.env[key] ?? fallback;
}

export const env = {
  NODE_ENV: optional('NODE_ENV', 'development'),
  PORT: parseInt(optional('PORT', '5000'), 10),
  API_VERSION: optional('API_VERSION', 'v1'),

  DATABASE_URL: required('DATABASE_URL'),

  JWT_ACCESS_SECRET: required('JWT_ACCESS_SECRET'),
  JWT_REFRESH_SECRET: required('JWT_REFRESH_SECRET'),
  JWT_ACCESS_EXPIRES_IN: optional('JWT_ACCESS_EXPIRES_IN', '15m'),
  JWT_REFRESH_EXPIRES_IN: optional('JWT_REFRESH_EXPIRES_IN', '7d'),

  ALLOWED_ORIGINS: optional('ALLOWED_ORIGINS', 'http://localhost:3000').split(','),

  RATE_LIMIT_WINDOW_MS: parseInt(optional('RATE_LIMIT_WINDOW_MS', '900000'), 10),
  RATE_LIMIT_MAX: parseInt(optional('RATE_LIMIT_MAX', '100'), 10),

  MAX_FILE_SIZE_MB: parseInt(optional('MAX_FILE_SIZE_MB', '10'), 10),

  CLOUDINARY_CLOUD_NAME: required('CLOUDINARY_CLOUD_NAME'),
  CLOUDINARY_API_KEY: required('CLOUDINARY_API_KEY'),
  CLOUDINARY_API_SECRET: required('CLOUDINARY_API_SECRET'),

  LOG_LEVEL: optional('LOG_LEVEL', 'debug'),
  LOG_DIR: optional('LOG_DIR', 'logs'),

  isProd: process.env.NODE_ENV === 'production',
  isDev: process.env.NODE_ENV !== 'production',
} as const;
