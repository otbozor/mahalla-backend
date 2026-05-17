import { prisma } from '../../config/database';

export const authRepository = {
  findUserByEmail: (email: string) =>
    prisma.user.findUnique({ where: { email } }),

  findUserById: (id: string) =>
    prisma.user.findUnique({ where: { id } }),

  updateLastLogin: (id: string) =>
    prisma.user.update({ where: { id }, data: { lastLoginAt: new Date() } }),

  updatePassword: (id: string, password: string) =>
    prisma.user.update({ where: { id }, data: { password } }),

  saveRefreshToken: (userId: string, token: string, expiresAt: Date) =>
    prisma.refreshToken.create({ data: { userId, token, expiresAt } }),

  findRefreshToken: (token: string) =>
    prisma.refreshToken.findUnique({ where: { token }, include: { user: true } }),

  deleteRefreshToken: (token: string) =>
    prisma.refreshToken.delete({ where: { token } }),

  deleteAllRefreshTokens: (userId: string) =>
    prisma.refreshToken.deleteMany({ where: { userId } }),

  deleteExpiredTokens: () =>
    prisma.refreshToken.deleteMany({ where: { expiresAt: { lt: new Date() } } }),
};
