import { AcademicSemester, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const insertIntoDB = async (
  AcademicSemesterData: AcademicSemester
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({
    data: AcademicSemesterData,
  });
  return result;
};

export const AcademicSemesterService = {
  insertIntoDB,
};
