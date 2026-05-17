import { appealsRepository } from './appeals.repository';
import { parsePagination, buildMeta } from '../../utils/pagination';
import { NotFoundError } from '../../utils/errors';
import { generateTicketNo } from '../../utils/ticket';
import type { CreateAppealInput, AppealQuery } from './appeals.dto';
import { AppealStatus } from '@prisma/client';

export const appealsService = {
  async getAll(query: AppealQuery) {
    const { page, limit, skip } = parsePagination(query);
    const [items, total] = await appealsRepository.findAll(query, skip, limit);
    return { items, meta: buildMeta(total, page, limit) };
  },

  async getById(id: string) {
    const appeal = await appealsRepository.findById(id);
    if (!appeal) throw new NotFoundError('Appeal');
    return appeal;
  },

  async trackByTicket(ticketNo: string) {
    const appeal = await appealsRepository.findByTicket(ticketNo);
    if (!appeal) throw new NotFoundError('Appeal');
    return appeal;
  },

  async create(dto: CreateAppealInput, attachments: string[] = []) {
    const ticketNo = generateTicketNo();
    return appealsRepository.create({ ticketNo, ...dto, attachments });
  },

  async updateStatus(id: string, status: AppealStatus) {
    if (!await appealsRepository.findById(id)) throw new NotFoundError('Appeal');
    return appealsRepository.updateStatus(id, status);
  },

  async respond(appealId: string, adminId: string, message: string) {
    const appeal = await appealsRepository.findById(appealId);
    if (!appeal) throw new NotFoundError('Appeal');
    await appealsRepository.addResponse(appealId, adminId, message);
    if (appeal.status === AppealStatus.PENDING) {
      return appealsRepository.updateStatus(appealId, AppealStatus.IN_PROGRESS);
    }
    if (appeal.status === AppealStatus.IN_PROGRESS) {
      return appealsRepository.updateStatus(appealId, AppealStatus.RESOLVED);
    }
    return appealsRepository.findById(appealId);
  },

  getCategories: () => appealsRepository.findAllCategories(),
  createCategory: (name: string, nameRu?: string) => appealsRepository.createCategory(name, nameRu),
};
