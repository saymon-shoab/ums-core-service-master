import express from 'express';
import validateRequest from './../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { academicSemesterValidation } from './academicSemesterValidation';

const router = express.Router();

router.post(
  '/',
  validateRequest(academicSemesterValidation.create),
  AcademicSemesterController.insertIntoDB
);
router.get('/:id', AcademicSemesterController.getDataById);
router.get('/', AcademicSemesterController.allDataFromDB);

export const AcademicSemesterRoutes = router;
