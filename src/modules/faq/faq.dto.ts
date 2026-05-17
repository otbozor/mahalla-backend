import { z } from 'zod';

export const CreateFAQDto = z.object({
  question: z.string().min(5).max(500),
  questionRu: z.string().max(500).optional(),
  answer: z.string().min(5).max(2000),
  answerRu: z.string().max(2000).optional(),
  categoryId: z.string().optional(),
  sortOrder: z.number().int().default(0),
  isPublished: z.boolean().default(true),
});

export const UpdateFAQDto = CreateFAQDto.partial();

export type CreateFAQInput = z.infer<typeof CreateFAQDto>;
export type UpdateFAQInput = z.infer<typeof UpdateFAQDto>;
