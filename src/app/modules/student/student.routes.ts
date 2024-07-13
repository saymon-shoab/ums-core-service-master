import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { studentController } from './student.controller';
import { StudentValidation } from './student.validation';

const router = express.Router();

router.get('/', studentController.getAllFromDB);

router.get("/my-courses",
  auth(ENUM_USER_ROLE.STUDENT),
  studentController.myCourses
)
router.get('/:id', studentController.getByIdFromDB);

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(StudentValidation.create),
  studentController.insertIntoDB
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(StudentValidation.update),
  studentController.updateIntoDB
);
router.delete('/:id',
 auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),     
 studentController.deleteFromDB);

router.get("/my-courses",
  auth(ENUM_USER_ROLE.STUDENT),
  studentController.myCourses
)

export const studentRoutes = router;
