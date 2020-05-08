import { Student } from "../models/student";
import * as studentDao from '../daos/student-dao';

export function getAllStudents():Promise<Student[]>{
    return studentDao.getAllStudents();
}
export function getStudentByID(id :number):Student{
    return studentDao.getStudentByID(id);
}
export function saveStudent(student):Student{
    const newStudent = new Student(undefined, student.firstName, student.lastName, student.major);
    if (student.firstName&&student.lastName){
        return studentDao.saveStudent(newStudent);
    }
    else{
        //todo
    }
}