import { Instructor } from "../models/instructor";
import * as instructorDao from '../daos/instructor-dao';

export function getAllInstructors():Promise<Instructor[]>{
    return instructorDao.getAllInstructors();
}
export function getInstructorByID(id :number):Instructor{
    return instructorDao.getInstructorByID(id);
}
export function saveInstructor(instructor):Instructor{
    const newInstructor = new Instructor(undefined, instructor.firstName, instructor.lastName, instructor.major);
    if (instructor.firstName&&instructor.lastName){
        return instructorDao.saveInstructor(newInstructor);
    }
    else{
        //todo
    }
}