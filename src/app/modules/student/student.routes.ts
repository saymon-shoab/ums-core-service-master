import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { studentController } from './student.controller';
import { StudentValidation } from './student.validation';

const router = express.Router();

router.get('/', studentController.getAllFromDB);

router.get('/:id', studentController.getByIdFromDB);

router.post(
  '/',
  validateRequest(StudentValidation.create),
  studentController.insertIntoDB
);

router.patch(
  '/:id',
  validateRequest(StudentValidation.update),
  studentController.updateIntoDB
);
router.delete('/:id', studentController.deleteFromDB);

export const studentRoutes = router;
