import slugify from 'slugify';
import { newsRepository } from './news.repository';
import { parsePagination, buildMeta } from '../../utils/pagination';
import { NotFoundError, ConflictError } from '../../utils/errors';
import type { CreateNewsInput, UpdateNewsInput, NewsQuery } from './news.dto';

export const newsService = {
  async getAll(query: NewsQuery) {
    const { page, limit, skip } = parsePagination(query);
    const [items, total] = await newsRepository.findAll(query, skip, limit);
    return { items, meta: buildMeta(total, page, limit) };
  },

  async getBySlug(slug: string) {
    const news = await newsRepository.findBySlug(slug);
    if (!news) throw new NotFoundError('News');
    return news;
  },

  async trackView(slug: string) {
    const news = await newsRepository.findBySlug(slug);
    if (!news) return;
    await newsRepository.incrementView(news.id);
  },

  async create(dto: CreateNewsInput) {
    const slug = slugify(dto.title, { lower: true, strict: true });
    const existing = await newsRepository.findBySlug(slug);
    if (existing) throw new ConflictError('News with this title already exists');
    return newsRepository.create({ ...dto, slug, publishedAt: dto.publishedAt ? new Date(dto.publishedAt) : undefined });
  },

  async update(id: string, dto: UpdateNewsInput) {
    const news = await newsRepository.findById(id);
    if (!news) throw new NotFoundError('News');
    const slug = dto.title ? slugify(dto.title, { lower: true, strict: true }) : undefined;
    return newsRepository.update(id, { ...dto, ...(slug && { slug }), publishedAt: dto.publishedAt ? new Date(dto.publishedAt) : undefined });
  },

  async delete(id: string) {
    const news = await newsRepository.findById(id);
    if (!news) throw new NotFoundError('News');
    await newsRepository.delete(id);
  },

  getCategories: () => newsRepository.findAllCategories(),

  async createCategory(name: string, nameRu?: string) {
    const slug = slugify(name, { lower: true, strict: true });
    const existing = await newsRepository.findCategoryBySlug(slug);
    if (existing) throw new ConflictError('Category already exists');
    return newsRepository.createCategory(name, nameRu, slug);
  },
};
