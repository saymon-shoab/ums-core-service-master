import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { ICourseCreateData } from "./course.interface";


const insertIntoDB = async(data: ICourseCreateData): Promise<any> => {

    const {preRequisiteCourses, ...courseData} = data;
    const newCourse = await prisma.$transaction(async(transitionClient)=>{
        const result = await transitionClient.course.create({
            data: courseData
        })
        if (!result) {
            throw new ApiError(httpStatus.BAD_REQUEST,'Unable to create course')
        }
        if (preRequisiteCourses && preRequisiteCourses.length>0) {
            for (let i = 0; i < preRequisiteCourses.length; i++) {
                const createPrerequisite = await transitionClient.courseToPrerequisite.create({
                    data:{
                        courseID: result.id,
                        preRequisiteId: preRequisiteCourses[i].courseId
                    }
                });
            }
        }
       return result
    })
    if (newCourse) {
        const responseData = await prisma.course.findUnique({
            where:{
                id:newCourse.id
            },
            include:{
                PreRequisite: {
                    include: {
                        preRequisite:true
                    }
                },
                PreRequisiteFor:{
                    include:{
                        course:true
                    }
                }
            }
        })
        return responseData
    }
    throw new ApiError(httpStatus.BAD_REQUEST,'Unable to create course')

}

export const CourseService = {
    insertIntoDB
}