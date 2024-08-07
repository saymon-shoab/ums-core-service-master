import { AcademicSemester, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { RedisClient } from '../../../shared/redis';
import { AcademicSemesterSearchAbleFields, academicSemesterTitleCodeMapper, EVENT_ACADEMIC_SEMESTER_CREATED, EVENT_ACADEMIC_SEMESTER_UPDATED } from './academicSemester.constant';
import { IAcademicSemesterFilterRequest } from './academicSemester.interface';

const insertIntoDB = async (
  AcademicSemesterData: AcademicSemester
): Promise<AcademicSemester> => {
  if (academicSemesterTitleCodeMapper[AcademicSemesterData.title] !== AcademicSemesterData.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
  }
  const result = await prisma.academicSemester.create({
    data: AcademicSemesterData,
  });
  if (result) {
    await RedisClient.publish(EVENT_ACADEMIC_SEMESTER_CREATED,JSON.stringify(result))
  }
  return result;
};

const getAllFromDB = async (
  filters: IAcademicSemesterFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicSemester[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  console.log(filterData);
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      OR: AcademicSemesterSearchAbleFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  const whereConditions: Prisma.AcademicSemesterWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};
  const result = await prisma.academicSemester.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.academicSemester.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<AcademicSemester | null> => {
  const result = await prisma.academicSemester.findUnique({
    where: { id },
  });
  return result;
};


const updateIntoDB = async(id:string, payload:Partial<AcademicSemester>): Promise<AcademicSemester>=>{
  const result = await prisma.academicSemester.update({
    where:{
      id
    },
    data: payload
  })
  if (result) {
    RedisClient.publish(EVENT_ACADEMIC_SEMESTER_UPDATED,JSON.stringify(result))
  }
  return result 
}

const deleteIntoDB = async(id:string): Promise<AcademicSemester> => {
   const result = await prisma.academicSemester.delete({
    where: {id}
   })
   return result 
}

export const AcademicSemesterService = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateIntoDB,
  deleteIntoDB
};
