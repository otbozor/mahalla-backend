import { faqRepository } from './faq.repository';
import { NotFoundError } from '../../utils/errors';
import type { CreateFAQInput, UpdateFAQInput } from './faq.dto';

export const faqService = {
  getAll: (isAdmin = false) => faqRepository.findAll(!isAdmin),

  async getById(id: string) {
    const faq = await faqRepository.findById(id);
    if (!faq) throw new NotFoundError('FAQ');
    return faq;
  },

  create: (dto: CreateFAQInput) => faqRepository.create(dto),

  async update(id: string, dto: UpdateFAQInput) {
    if (!await faqRepository.findById(id)) throw new NotFoundError('FAQ');
    return faqRepository.update(id, dto);
  },

  async delete(id: string) {
    if (!await faqRepository.findById(id)) throw new NotFoundError('FAQ');
    await faqRepository.delete(id);
  },

  getCategories: () => faqRepository.findAllCategories(),
  createCategory: (name: string, nameRu?: string) => faqRepository.createCategory(name, nameRu),
};
