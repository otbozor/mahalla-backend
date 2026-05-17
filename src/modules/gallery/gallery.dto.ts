import { z } from 'zod';
import { MediaType } from '@prisma/client';

export const CreateAlbumDto = z.object({
  title: z.string().min(2).max(200),
  titleRu: z.string().max(200).optional(),
  description: z.string().max(500).optional(),
  coverUrl: z.string().url().optional(),
});

export const CreateGalleryItemDto = z.object({
  albumId: z.string().optional(),
  type: z.nativeEnum(MediaType).default('IMAGE'),
  url: z.string().min(1),
  thumbUrl: z.string().url().optional(),
  caption: z.string().max(300).optional(),
  captionRu: z.string().max(300).optional(),
  sortOrder: z.number().int().default(0),
});

export const GalleryQueryDto = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  albumId: z.string().optional(),
  type: z.nativeEnum(MediaType).optional(),
});

export type CreateAlbumInput = z.infer<typeof CreateAlbumDto>;
export type CreateGalleryItemInput = z.infer<typeof CreateGalleryItemDto>;
export type GalleryQuery = z.infer<typeof GalleryQueryDto>;
