import { z } from 'zod';
import { Role } from '@prisma/client';

export const CreateUserDto = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(/(?=.*[A-Z])(?=.*\d)/, 'Must contain uppercase and number'),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  role: z.nativeEnum(Role).default('MODERATOR'),
});

export const UpdateUserDto = z.object({
  firstName: z.string().min(2).max(50).optional(),
  lastName: z.string().min(2).max(50).optional(),
  role: z.nativeEnum(Role).optional(),
  isActive: z.boolean().optional(),
});

export type CreateUserInput = z.infer<typeof CreateUserDto>;
export type UpdateUserInput = z.infer<typeof UpdateUserDto>;
