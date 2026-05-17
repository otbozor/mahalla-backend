import { z } from 'zod';
import { ServiceType } from '@prisma/client';

export const CreateServiceDto = z.object({
  title: z.string().min(2).max(200),
  titleRu: z.string().max(200).optional(),
  description: z.string().max(500).optional(),
  descriptionRu: z.string().max(500).optional(),
  url: z.string().optional().transform((v) => v || undefined),
  phone: z.string().optional(),
  type: z.nativeEnum(ServiceType),
  icon: z.string().max(50).optional(),
  imageUrl: z.string().optional().transform((v) => v || undefined),
  lat: z.number().optional(),
  lon: z.number().optional(),
  address: z.string().max(300).optional(),
  addressRu: z.string().max(300).optional(),
  hours: z.string().max(100).optional(),
  hoursRu: z.string().max(100).optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

export const UpdateServiceDto = CreateServiceDto.partial();

export const ServiceQueryDto = z.object({
  type: z.nativeEnum(ServiceType).optional(),
  isActive: z.enum(['true', 'false']).optional(),
});

export type CreateServiceInput = z.infer<typeof CreateServiceDto>;
export type ServiceQuery = z.infer<typeof ServiceQueryDto>;
