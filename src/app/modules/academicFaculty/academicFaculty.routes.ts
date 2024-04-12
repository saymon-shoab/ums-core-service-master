import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.get('/', AcademicFacultyController.getAllFromDB);
router.get('/:id', AcademicFacultyController.getByIdFromDB);

router.post(
      '/',
      validateRequest(AcademicFacultyValidation.create),
      AcademicFacultyController.insertIntoDB
);
router.patch(
      '/:id',
       auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
       validateRequest(AcademicFacultyValidation.update),
       AcademicFacultyController.updateIntoDB
 )

 router.delete(
   "/:id",
   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
   AcademicFacultyController.deleteIntoDB
 )

export const academicFacultyRoutes = router;
