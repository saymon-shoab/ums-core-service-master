import express from 'express';
import { studentEnrolledCourseMarkRoutes } from '../modules/StudentEnrolledCourseMark/StudentEnrolledCourseMark.routes';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes';
import { buildingRoutes } from '../modules/building/bulding.routes';
import { courseRoutes } from '../modules/course/course.routes';
import { facultyRoutes } from '../modules/faculty/faculty.routes';
import { offeredCourseRoutes } from '../modules/offeredCourse/offeredCourse.routes';
import { offeredCourseClassScheduleRoutes } from '../modules/offeredCourseClassSchedule/offeredCourseClassSchedule.routes';
import { offeredCourseSectionRoutes } from '../modules/offeredCourseSection/offeredCourseSection.routes';
import { roomRoutes } from '../modules/room/room.routes';
import { semesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.routes';
import { studentRoutes } from '../modules/student/student.routes';
import { studentEnrolledCourseRoutes } from '../modules/studentEnrolledCourse/studentEnrolledCourse.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/academic-departments',
    route: academicDepartmentRoutes
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: academicFacultyRoutes,
  },
  {
    path: '/rooms',
    route: roomRoutes
  },
  {
    path: '/faculties',
    route: facultyRoutes,
  },
  {
    path: '/students',
    route: studentRoutes,
  },
  {
    path: '/buildings',
    route: buildingRoutes,
  },
  {
    path: '/courses',
    route: courseRoutes,
  },
  {
    path: '/semester-registration',
    route: semesterRegistrationRoutes
  },
  {
    path:"/offered-course",
    route: offeredCourseRoutes
  },
  {
    path:"/offered-course-sections",
    route: offeredCourseSectionRoutes
  },{
    path: '/offered-course-class-schedules',
    route: offeredCourseClassScheduleRoutes
  },
  {
    path: '/student-enrolled-course-marks',
    route: studentEnrolledCourseMarkRoutes
  },
  {
    path:"/student-enrolled-courses",
    route: studentEnrolledCourseRoutes
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
