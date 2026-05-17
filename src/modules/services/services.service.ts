import { servicesRepository } from './services.repository';
import { NotFoundError } from '../../utils/errors';
import type { CreateServiceInput, ServiceQuery } from './services.dto';

export const servicesService = {
  getAll: (query: ServiceQuery) => servicesRepository.findAll(query),

  async getById(id: string) {
    const service = await servicesRepository.findById(id);
    if (!service) throw new NotFoundError('Service');
    return service;
  },

  create: (dto: CreateServiceInput) => servicesRepository.create(dto),

  async update(id: string, dto: Partial<CreateServiceInput>) {
    if (!await servicesRepository.findById(id)) throw new NotFoundError('Service');
    return servicesRepository.update(id, dto);
  },

  async delete(id: string) {
    if (!await servicesRepository.findById(id)) throw new NotFoundError('Service');
    await servicesRepository.delete(id);
  },
};
