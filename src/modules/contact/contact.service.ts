import { contactRepository } from './contact.repository';

export const contactService = {
  get:    ()       => contactRepository.get(),
  update: (data: Parameters<typeof contactRepository.update>[0]) => contactRepository.update(data),
};
