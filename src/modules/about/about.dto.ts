import { z } from 'zod';

const optionalString = (max: number) =>
  z.string().max(max).optional().transform((v) => v || undefined);

export const CreateLeaderDto = z.object({
  name: z.string().min(2).max(200),
  nameRu: optionalString(200),
  role: z.string().min(2).max(200),
  roleRu: optionalString(200),
  phone: optionalString(30),
  bio: optionalString(1000),
  bioRu: optionalString(1000),
  imageUrl: z.string().optional().transform((v) => v || undefined),
  sortOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const UpdateLeaderDto = CreateLeaderDto.partial();

export const CreateAchievementDto = z.object({
  text: z.string().min(5).max(500),
  textRu: optionalString(500),
  year: z.number().int().min(1990).max(2100).optional().nullable(),
  sortOrder: z.number().int().default(0),
});

export const UpdateAchievementDto = CreateAchievementDto.partial();

export type CreateLeaderInput = z.infer<typeof CreateLeaderDto>;
export type UpdateLeaderInput = z.infer<typeof UpdateLeaderDto>;
export type CreateAchievementInput = z.infer<typeof CreateAchievementDto>;
export type UpdateAchievementInput = z.infer<typeof UpdateAchievementDto>;
