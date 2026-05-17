import { usersRepository } from './users.repository';
import { hash } from '../../utils/hash';
import { NotFoundError, ConflictError, ForbiddenError } from '../../utils/errors';
import type { CreateUserInput, UpdateUserInput } from './users.dto';
import { Role } from '@prisma/client';

export const usersService = {
  getAll: () => usersRepository.findAll(),

  async getById(id: string) {
    const user = await usersRepository.findById(id);
    if (!user) throw new NotFoundError('User');
    return user;
  },

  async create(dto: CreateUserInput, requesterId: string, requesterRole: Role) {
    if (requesterRole !== Role.SUPER_ADMIN && dto.role === Role.SUPER_ADMIN) {
      throw new ForbiddenError('Only SUPER_ADMIN can create SUPER_ADMIN users');
    }
    const existing = await usersRepository.findByEmail(dto.email);
    if (existing) throw new ConflictError('Email already in use');
    const hashed = await hash(dto.password);
    return usersRepository.create({ ...dto, password: hashed });
  },

  async update(id: string, dto: UpdateUserInput, requesterRole: Role) {
    const user = await usersRepository.findById(id);
    if (!user) throw new NotFoundError('User');
    if (dto.role === Role.SUPER_ADMIN && requesterRole !== Role.SUPER_ADMIN) {
      throw new ForbiddenError('Only SUPER_ADMIN can assign SUPER_ADMIN role');
    }
    return usersRepository.update(id, dto);
  },

  async delete(id: string, requesterId: string) {
    if (id === requesterId) throw new ForbiddenError('Cannot delete your own account');
    if (!await usersRepository.findById(id)) throw new NotFoundError('User');
    await usersRepository.delete(id);
  },
};
