import { z } from 'zod';
import { NewsStatus } from '@prisma/client';

export const CreateNewsDto = z.object({
  title: z.string().min(3).max(200),
  titleRu: z.string().max(200).optional(),
  content: z.string().min(10),
  contentRu: z.string().optional(),
  excerpt: z.string().max(500).optional(),
  excerptRu: z.string().max(500).optional(),
  imageUrl: z.string().optional().transform((v) => v || undefined),
  status: z.nativeEnum(NewsStatus).default('DRAFT'),
  isFeatured: z.boolean().default(false),
  categoryId: z.string().optional(),
  publishedAt: z.string().datetime().optional(),
});

export const UpdateNewsDto = CreateNewsDto.partial();

export const NewsQueryDto = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  status: z.nativeEnum(NewsStatus).optional(),
  categoryId: z.string().optional(),
  isFeatured: z.enum(['true', 'false']).optional(),
  search: z.string().optional(),
});

export type CreateNewsInput = z.infer<typeof CreateNewsDto>;
export type UpdateNewsInput = z.infer<typeof UpdateNewsDto>;
export type NewsQuery = z.infer<typeof NewsQueryDto>;
