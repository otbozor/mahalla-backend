import { galleryRepository } from './gallery.repository';
import { parsePagination, buildMeta } from '../../utils/pagination';
import { NotFoundError } from '../../utils/errors';
import type { CreateAlbumInput, CreateGalleryItemInput, GalleryQuery } from './gallery.dto';

export const galleryService = {
  getAlbums: () => galleryRepository.findAllAlbums(),

  async getAlbumById(id: string) {
    const album = await galleryRepository.findAlbumById(id);
    if (!album) throw new NotFoundError('Album');
    return album;
  },

  createAlbum: (dto: CreateAlbumInput) => galleryRepository.createAlbum(dto),

  async updateAlbum(id: string, dto: Partial<CreateAlbumInput>) {
    if (!await galleryRepository.findAlbumById(id)) throw new NotFoundError('Album');
    return galleryRepository.updateAlbum(id, dto);
  },

  async deleteAlbum(id: string) {
    if (!await galleryRepository.findAlbumById(id)) throw new NotFoundError('Album');
    await galleryRepository.deleteAlbum(id);
  },

  async getItems(query: GalleryQuery) {
    const { page, limit, skip } = parsePagination(query);
    const [items, total] = await galleryRepository.findAllItems(query, skip, limit);
    return { items, meta: buildMeta(total, page, limit) };
  },

  createItem: (dto: CreateGalleryItemInput, uploadedUrl?: string) =>
    galleryRepository.createItem({ ...dto, url: uploadedUrl ?? dto.url }),

  async deleteItem(id: string) {
    if (!await galleryRepository.findItemById(id)) throw new NotFoundError('Gallery item');
    await galleryRepository.deleteItem(id);
  },
};
