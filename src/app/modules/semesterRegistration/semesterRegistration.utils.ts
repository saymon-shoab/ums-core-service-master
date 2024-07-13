const getAvailableCourse = (
    offeredCourse: any,
    studentCompletedCourse:any,
    studentCurrentSemesterTakenCourse: any,

)=> {
    console.log(offeredCourse,studentCompletedCourse)

    const completedCoursesId = studentCompletedCourse.map((course:any)=> course.courseId)
    const availableCourseList = offeredCourse
    .filter((offeredCourse:any)=> !completedCoursesId.includes(offeredCourse.courseId))
    .filter((course:any)=> {
        const preRequisites = course.course.preRequisite
        if (preRequisites.length === 0) {
            return true
        }else{
            const preRequisiteIds = preRequisites.map((preRequisite: any)=>preRequisite.preRequisiteIds)
            return preRequisiteIds.every((id: string)=> completedCoursesId.includes(id))
        }
    })
    .map((course:any)=>{
        const isAlreadyTakenCourse = studentCurrentSemesterTakenCourse.find(
            (C:any)=> C.offeredCourse === course.id
        )
        if (isAlreadyTakenCourse) {
            course.offeredCourseSections.map((section:any)=> {
                if (section.id === isAlreadyTakenCourse.offeredCourseSectionId) {
                    section.isTaken = true
                }else {
                    section.isTaken = false
                }
            })
            return {
                ...course,
                isTaken: true
            }
        }else{
            course.offeredCourseSections.map((section: any)=>{
                section.isTaken = false
            });
            return {
                ...course,
                isTaken: false
            }
        }
    })

    return availableCourseList
}

export const SemesterRegistrationUtils= {
    getAvailableCourse
}