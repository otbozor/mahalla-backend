import { z } from 'zod';
import { EventStatus } from '@prisma/client';

export const CreateEventDto = z.object({
  title: z.string().min(3).max(200),
  titleRu: z.string().max(200).optional(),
  description: z.string().min(10),
  descriptionRu: z.string().optional(),
  location: z.string().max(200).optional(),
  imageUrl: z.string().optional().transform((v) => v || undefined),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  status: z.nativeEnum(EventStatus).default('UPCOMING'),
  categoryId: z.string().optional(),
  maxAttendees: z.number().int().positive().optional(),
  isRegistrationOpen: z.boolean().default(false),
});

export const UpdateEventDto = CreateEventDto.partial();

export const EventQueryDto = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  status: z.nativeEnum(EventStatus).optional(),
  categoryId: z.string().optional(),
  search: z.string().optional(),
});

export const RegisterEventDto = z.object({
  fullName: z.string().min(3).max(100),
  phone: z.string().regex(/^\+998\d{9}$/, 'Invalid Uzbek phone number'),
  email: z.string().email().optional(),
});

export type CreateEventInput = z.infer<typeof CreateEventDto>;
export type UpdateEventInput = z.infer<typeof UpdateEventDto>;
export type EventQuery = z.infer<typeof EventQueryDto>;
export type RegisterEventInput = z.infer<typeof RegisterEventDto>;
