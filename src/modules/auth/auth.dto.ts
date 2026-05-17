import { z } from 'zod';

export const LoginDto = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const RefreshDto = z.object({
  refreshToken: z.string().min(1),
});

export const ChangePasswordDto = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(8).regex(/(?=.*[A-Z])(?=.*\d)/, 'Must contain uppercase and number'),
});

export type LoginInput = z.infer<typeof LoginDto>;
export type RefreshInput = z.infer<typeof RefreshDto>;
export type ChangePasswordInput = z.infer<typeof ChangePasswordDto>;
