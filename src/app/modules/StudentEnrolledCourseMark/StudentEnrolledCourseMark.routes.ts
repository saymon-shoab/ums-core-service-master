import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { StudentEnrolledCourseMarkConroller } from './StudentEnrolledCourseMark.controller';

const router = express.Router();

router.get(
    '/',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY),
    StudentEnrolledCourseMarkConroller.getAllFromDB
);

router.get(
    '/my-marks',
    auth(ENUM_USER_ROLE.STUDENT),
    StudentEnrolledCourseMarkConroller.getMyCourseMarks
);

router.patch('/update-marks', StudentEnrolledCourseMarkConroller.updateStudentMarks)
router.patch('/update-final-marks', StudentEnrolledCourseMarkConroller.updateFinalMarks)

export const studentEnrolledCourseMarkRoutes = router;