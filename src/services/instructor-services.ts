import { Instructor } from "../models/instructor";
import * as instructorDao from '../daos/instructor-dao';
import { InstructorClasses } from "../models/instructor-classes";


export function getAllInstructors():Promise<Instructor[]>{
    return instructorDao.getAllInstructors();
}
export function getInstructorByID(id :number):Promise<Instructor>{
    return instructorDao.getInstructorByID(id);
}
export function saveInstructor(instructor):Promise<Instructor>{
    const newInstructor = new Instructor(undefined, instructor.first_name, instructor.last_name, instructor.department);
    if (newInstructor.firstName&&newInstructor.lastName){
        return instructorDao.saveInstructor(newInstructor);
    }
    else{
        console.log("invalid instructor");
        return new Promise((resolve, reject)=> reject(422));
    }
}
export function patchInstructor(instructor:any):Promise<Instructor>{
    const newInstructor = new Instructor(
        instructor.id, instructor.first_name, instructor.last_name, instructor.major
    );
    if (!newInstructor.id){
        throw new Error('400');
    }
    return instructorDao.patchInstructor(newInstructor);
}
export function getClassesByInstructor(id: number):Promise<InstructorClasses[]>{
    return instructorDao.getClassesbyInstructor(id);
}
