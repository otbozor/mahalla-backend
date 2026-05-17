import { MediaType, Prisma } from '@prisma/client';
import { prisma } from '../../config/database';
import type { GalleryQuery } from './gallery.dto';

export const galleryRepository = {
  findAllAlbums: () => prisma.galleryAlbum.findMany({ include: { _count: { select: { items: true } } }, orderBy: { createdAt: 'desc' } }),
  findAlbumById: (id: string) => prisma.galleryAlbum.findUnique({ where: { id }, include: { items: { orderBy: { sortOrder: 'asc' } } } }),
  createAlbum: (data: Prisma.GalleryAlbumCreateInput) => prisma.galleryAlbum.create({ data }),
  updateAlbum: (id: string, data: Prisma.GalleryAlbumUpdateInput) => prisma.galleryAlbum.update({ where: { id }, data }),
  deleteAlbum: (id: string) => prisma.galleryAlbum.delete({ where: { id } }),

  findAllItems(query: GalleryQuery, skip: number, take: number) {
    const where: Prisma.GalleryItemWhereInput = {
      ...(query.albumId && { albumId: query.albumId }),
      ...(query.type && { type: query.type }),
    };
    return Promise.all([
      prisma.galleryItem.findMany({ where, skip, take, orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }] }),
      prisma.galleryItem.count({ where }),
    ]);
  },

  findItemById: (id: string) => prisma.galleryItem.findUnique({ where: { id } }),
  createItem: (data: Prisma.GalleryItemCreateInput) => prisma.galleryItem.create({ data }),
  updateItem: (id: string, data: Prisma.GalleryItemUpdateInput) => prisma.galleryItem.update({ where: { id }, data }),
  deleteItem: (id: string) => prisma.galleryItem.delete({ where: { id } }),
};
