import { leaderRepository, achievementRepository } from './about.repository';
import { NotFoundError } from '../../utils/errors';
import type {
  CreateLeaderInput,
  UpdateLeaderInput,
  CreateAchievementInput,
  UpdateAchievementInput,
} from './about.dto';

export const leaderService = {
  getAll: (isAdmin = false) => leaderRepository.findAll(!isAdmin),

  async getById(id: string) {
    const leader = await leaderRepository.findById(id);
    if (!leader) throw new NotFoundError('Leader');
    return leader;
  },

  create: (dto: CreateLeaderInput) => leaderRepository.create(dto),

  async update(id: string, dto: UpdateLeaderInput) {
    if (!await leaderRepository.findById(id)) throw new NotFoundError('Leader');
    return leaderRepository.update(id, dto);
  },

  async delete(id: string) {
    if (!await leaderRepository.findById(id)) throw new NotFoundError('Leader');
    await leaderRepository.delete(id);
  },
};

export const achievementService = {
  getAll: () => achievementRepository.findAll(),

  async getById(id: string) {
    const item = await achievementRepository.findById(id);
    if (!item) throw new NotFoundError('Achievement');
    return item;
  },

  create: (dto: CreateAchievementInput) => achievementRepository.create(dto),

  async update(id: string, dto: UpdateAchievementInput) {
    if (!await achievementRepository.findById(id)) throw new NotFoundError('Achievement');
    return achievementRepository.update(id, dto);
  },

  async delete(id: string) {
    if (!await achievementRepository.findById(id)) throw new NotFoundError('Achievement');
    await achievementRepository.delete(id);
  },
};
