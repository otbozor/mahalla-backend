import { Response } from 'express';
import { ApiResponse, PaginationMeta } from '../types';

export function ok<T>(res: Response, data: T, message?: string, meta?: PaginationMeta) {
  const body: ApiResponse<T> = { success: true, data, ...(message && { message }), ...(meta && { meta }) };
  return res.status(200).json(body);
}

export function created<T>(res: Response, data: T, message = 'Created successfully') {
  return res.status(201).json({ success: true, data, message });
}

export function noContent(res: Response) {
  return res.status(204).send();
}

export function badRequest(res: Response, message: string) {
  return res.status(400).json({ success: false, message });
}

export function unauthorized(res: Response, message = 'Unauthorized') {
  return res.status(401).json({ success: false, message });
}

export function forbidden(res: Response, message = 'Forbidden') {
  return res.status(403).json({ success: false, message });
}

export function notFound(res: Response, message = 'Resource not found') {
  return res.status(404).json({ success: false, message });
}

export function conflict(res: Response, message: string) {
  return res.status(409).json({ success: false, message });
}

export function serverError(res: Response, message = 'Internal server error') {
  return res.status(500).json({ success: false, message });
}
