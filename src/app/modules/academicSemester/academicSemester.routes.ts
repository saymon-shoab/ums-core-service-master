import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from './../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { academicSemesterValidation } from './academicSemesterValidation';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(academicSemesterValidation.create),
  AcademicSemesterController.insertIntoDB
);
router.get('/:id', AcademicSemesterController.getDataById);
router.get('/', AcademicSemesterController.allDataFromDB);
router.patch("/:id",
  validateRequest(academicSemesterValidation.update),
   auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN),AcademicSemesterController.updateIntoDB)
router.delete("/:id", auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN),AcademicSemesterController.deleteIntoDB)
export const AcademicSemesterRoutes = router;
