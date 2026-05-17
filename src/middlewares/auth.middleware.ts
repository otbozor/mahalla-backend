import { Request, Response, NextFunction } from 'express';
import { Role } from '@prisma/client';
import { verifyAccessToken } from '../utils/jwt';
import { UnauthorizedError, ForbiddenError } from '../utils/errors';

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) throw new UnauthorizedError('No token provided');

  const token = header.slice(7);
  const payload = verifyAccessToken(token);
  req.user = { id: payload.sub, email: payload.email, role: payload.role };
  next();
}

const ROLE_HIERARCHY: Record<Role, number> = {
  SUPER_ADMIN: 3,
  ADMIN: 2,
  MODERATOR: 1,
};

export function authorize(...roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) throw new UnauthorizedError();
    const userLevel = ROLE_HIERARCHY[req.user.role];
    const minRequired = Math.min(...roles.map((r) => ROLE_HIERARCHY[r]));
    if (userLevel < minRequired) throw new ForbiddenError('Insufficient permissions');
    next();
  };
}
