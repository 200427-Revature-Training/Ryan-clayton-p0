
import {Course} from '../models/course'
import * as CourseDao from '../daos/course-dao';
import {People} from '../models/people'
import {Classroom} from '../models/class'
import { ClassList } from '../models/classList';

export function getAllCourses():Promise<Course[]>{
    return CourseDao.getAllCourses();
}
export function getCourseByID(id :number):Promise<Course>{
    return CourseDao.getCourseByID(id);
}
export function saveCourse(course):Promise<Course>{
    const newCourse = new Course(undefined, course.course_name, course.department, course.description);
    if (newCourse.courseName&&newCourse.department){
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
    return CourseDao.getCourseListByID(id);
}
export function addClass(classroom:any):Promise<Classroom>{
    if(classroom.sid&&classroom.iid&&classroom.cid){
        return CourseDao.addClass(classroom.sid,classroom.iid,classroom.cid);
    }else{
        console.log("invalid Course");
        return new Promise((resolve, reject)=> reject(422));
    }
}
export function getClassList():Promise<ClassList[]>{
    return CourseDao.getAllClasses();
}
export function delCourse(id:number):Promise<Course>{
    return CourseDao.delCourse(id);
}
export function delClass(classroom:any):Promise<Classroom>{
    if(classroom.sid&&classroom.iid&&classroom.cid){
        return CourseDao.delClass(classroom.sid,classroom.iid,classroom.cid);
    }else{
        console.log("invalid Course");
        return new Promise((resolve, reject)=> reject(422));
    }
}