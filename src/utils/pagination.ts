import { PaginationMeta, PaginationQuery } from '../types';

export function parsePagination(query: PaginationQuery): { page: number; limit: number; skip: number } {
  const page = Math.max(1, parseInt(query.page ?? '1', 10));
  const limit = Math.min(100, Math.max(1, parseInt(query.limit ?? '10', 10)));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

export function buildMeta(total: number, page: number, limit: number): PaginationMeta {
  const totalPages = Math.ceil(total / limit);
  return {
    total,
    page,
    limit,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}
