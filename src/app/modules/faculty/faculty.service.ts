import { faculty } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (FacultyData: faculty): Promise<faculty> => {
  const result = await prisma.faculty.create({
    data: FacultyData,
  });
  return result;
};

const getDataById = async (id: string): Promise<faculty | null> => {
  const result = await prisma.faculty.findUnique({
    where: { id },
  });
  return result;
};

export const facultyService = {
  insertIntoDB,
  getDataById,
};
