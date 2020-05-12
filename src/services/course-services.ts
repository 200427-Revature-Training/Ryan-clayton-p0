
import {Course} from '../models/course'
import * as CourseDao from '../daos/course-dao';
import {People} from '../models/people'

export function getAllCourses():Promise<Course[]>{
    return CourseDao.getAllCourses();
}
export function getCourseByID(id :number):Promise<Course>{
    return CourseDao.getCourseByID(id);
}
export function saveCourse(course):Promise<Course>{
    const newCourse = new Course(undefined, course.course_name, course.department, course.description);
    if (newCourse.courseName&&newCourse.department){
        console.log(newCourse);
        return CourseDao.saveCourse(newCourse);
    }
    else{
        console.log("invalid Course");
        return new Promise((resolve, reject)=> reject(422));
    }
}
export function patchCourse(course:any):Promise<Course>{
    const newCourse = new Course(
        course.id, course.course_name, course.department, course.description
    );
    if (!newCourse.id){
        throw new Error('400');
    }
    return CourseDao.patchCourse(newCourse);
}
export function getCourseList(id :number):Promise<People[]>{
    return CourseDao.getClassListByID(id);
}