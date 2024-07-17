import { AcademicSemester } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterFilterAbleFileds } from './academicSemester.constant';
import { AcademicSemesterService } from './academicSemester.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.insertIntoDB(req.body);
  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Created!',
    data: result,
  });
});

const allDataFromDB = catchAsync(async (req: Request, res: Response) => {
  // const {page, limit, searchTerm} = req.query
  const filters = pick(req.query, AcademicSemesterFilterAbleFileds);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await AcademicSemesterService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Data Fetched!',
    meta: result.meta,
    data: result.data,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.getDataById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Data Fetched!',
    data: result,
  });
});

const updateIntoDB = catchAsync(async(req:Request,res:Response)=>{
  const {id} = req.params;

  const result = await AcademicSemesterService.updateIntoDB(id,req.body);
  sendResponse(res,{
    statusCode: httpStatus.OK,
    success:true,
    message:'academic semester updated successfylly',
    data:result
  })
})

const deleteIntoDB = catchAsync(async(req:Request,res:Response)=>{
  const {id} = req.params;
  const result = await AcademicSemesterService.deleteIntoDB(id);
  sendResponse(res,{
    statusCode: httpStatus.OK,
    success:true,
    message:"academic semester deleted successfylly",
    data: result
  })
})

export const AcademicSemesterController = {
  insertIntoDB,
  allDataFromDB,
  getDataById,
  updateIntoDB,
  deleteIntoDB
};
