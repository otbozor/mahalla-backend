import slugify from 'slugify';
import { eventsRepository } from './events.repository';
import { parsePagination, buildMeta } from '../../utils/pagination';
import { NotFoundError, ValidationError } from '../../utils/errors';
import type { CreateEventInput, UpdateEventInput, EventQuery, RegisterEventInput } from './events.dto';

export const eventsService = {
  async getAll(query: EventQuery) {
    const { page, limit, skip } = parsePagination(query);
    const [items, total] = await eventsRepository.findAll(query, skip, limit);
    return { items, meta: buildMeta(total, page, limit) };
  },

  async getById(id: string) {
    const event = await eventsRepository.findById(id);
    if (!event) throw new NotFoundError('Event');
    return event;
  },

  async create(dto: CreateEventInput) {
    return eventsRepository.create({
      ...dto,
      startDate: new Date(dto.startDate),
      endDate: dto.endDate ? new Date(dto.endDate) : undefined,
    });
  },

  async update(id: string, dto: UpdateEventInput) {
    const event = await eventsRepository.findById(id);
    if (!event) throw new NotFoundError('Event');
    return eventsRepository.update(id, {
      ...dto,
      ...(dto.startDate && { startDate: new Date(dto.startDate) }),
      ...(dto.endDate && { endDate: new Date(dto.endDate) }),
    });
  },

  async delete(id: string) {
    if (!await eventsRepository.findById(id)) throw new NotFoundError('Event');
    await eventsRepository.delete(id);
  },

  async register(eventId: string, dto: RegisterEventInput) {
    const event = await eventsRepository.findById(eventId);
    if (!event) throw new NotFoundError('Event');
    if (!event.isRegistrationOpen) throw new ValidationError('Registration is closed for this event');
    if (event.maxAttendees) {
      const count = await eventsRepository.countRegistrations(eventId);
      if (count >= event.maxAttendees) throw new ValidationError('Event is fully booked');
    }
    return eventsRepository.createRegistration(eventId, dto);
  },

  async getRegistrations(eventId: string) {
    if (!await eventsRepository.findById(eventId)) throw new NotFoundError('Event');
    return eventsRepository.getRegistrations(eventId);
  },

  getCategories: () => eventsRepository.findAllCategories(),

  createCategory: (name: string, nameRu?: string) =>
    eventsRepository.createCategory(name, nameRu, slugify(name, { lower: true, strict: true })),
};
