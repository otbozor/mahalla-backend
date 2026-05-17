import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { logger } from '../utils/logger';
import { env } from '../config/env';

export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof AppError && err.isOperational) {
    return res.status(err.statusCode).json({ success: false, message: err.message });
  }

  logger.error('Unhandled error', { error: err.message, stack: err.stack });

  return res.status(500).json({
    success: false,
    message: env.isProd ? 'Internal server error' : err.message,
    ...(env.isDev && { stack: err.stack }),
  });
}

export function notFoundMiddleware(_req: Request, res: Response) {
  res.status(404).json({ success: false, message: 'Route not found' });
}
