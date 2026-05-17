import { authRepository } from './auth.repository';
import { compare, hash } from '../../utils/hash';
import { signAccessToken, signRefreshToken, verifyRefreshToken, refreshExpiresAt } from '../../utils/jwt';
import { UnauthorizedError, ForbiddenError } from '../../utils/errors';
import type { LoginInput, ChangePasswordInput } from './auth.dto';

export const authService = {
  async login({ email, password }: LoginInput) {
    const user = await authRepository.findUserByEmail(email);
    if (!user || !user.isActive) throw new UnauthorizedError('Invalid credentials');

    const valid = await compare(password, user.password);
    if (!valid) throw new UnauthorizedError('Invalid credentials');

    await authRepository.updateLastLogin(user.id);

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);
    await authRepository.saveRefreshToken(user.id, refreshToken, refreshExpiresAt());

    return {
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role },
    };
  },

  async refresh(token: string) {
    const stored = await authRepository.findRefreshToken(token);
    if (!stored || stored.expiresAt < new Date()) {
      if (stored) await authRepository.deleteRefreshToken(token);
      throw new UnauthorizedError('Invalid or expired refresh token');
    }

    verifyRefreshToken(token);

    const { user } = stored;
    const payload = { sub: user.id, email: user.email, role: user.role };
    const newAccess = signAccessToken(payload);
    const newRefresh = signRefreshToken(payload);

    await authRepository.deleteRefreshToken(token);
    await authRepository.saveRefreshToken(user.id, newRefresh, refreshExpiresAt());

    return { accessToken: newAccess, refreshToken: newRefresh };
  },

  async logout(token: string) {
    await authRepository.deleteRefreshToken(token).catch(() => {});
  },

  async changePassword(userId: string, dto: ChangePasswordInput) {
    const user = await authRepository.findUserById(userId);
    if (!user) throw new UnauthorizedError();

    const valid = await compare(dto.currentPassword, user.password);
    if (!valid) throw new UnauthorizedError('Current password is incorrect');

    const hashed = await hash(dto.newPassword);
    await authRepository.updatePassword(userId, hashed);
    await authRepository.deleteAllRefreshTokens(userId);
  },

  async me(userId: string) {
    const user = await authRepository.findUserById(userId);
    if (!user || !user.isActive) throw new ForbiddenError();
    const { password: _, ...safe } = user;
    return safe;
  },
};
