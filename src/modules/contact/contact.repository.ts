import { prisma } from '../../config/database';

type UpdateData = Partial<{
  address: string; addressRu: string;
  email: string; phone: string;
  workingHours: string; workingHoursRu: string;
}>;

export const contactRepository = {
  async get() {
    let row = await prisma.contactInfo.findFirst();
    if (!row) row = await prisma.contactInfo.create({ data: {} });
    return row;
  },
  update: (data: UpdateData) => prisma.contactInfo.updateMany({ data }),
};
