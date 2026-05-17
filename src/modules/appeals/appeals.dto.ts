import { z } from 'zod';
import { AppealStatus } from '@prisma/client';

export const CreateAppealDto = z.object({
  fullName: z.string().min(3).max(100),
  phone: z.string().regex(/^\+998\d{9}$/, 'Invalid phone number'),
  categoryId: z.string().optional(),
  message: z.string().min(20).max(2000),
});

export const UpdateAppealStatusDto = z.object({
  status: z.nativeEnum(AppealStatus),
});

export const AppealResponseDto = z.object({
  message: z.string().min(5).max(1000),
});

export const AppealQueryDto = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  status: z.nativeEnum(AppealStatus).optional(),
  categoryId: z.string().optional(),
  search: z.string().optional(),
});

export type CreateAppealInput = z.infer<typeof CreateAppealDto>;
export type AppealQuery = z.infer<typeof AppealQueryDto>;
