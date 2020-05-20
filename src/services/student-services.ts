import { Student } from "../models/student";
import * as studentDao from '../daos/student-dao';
import { Classes } from "../models/student-classes";

export function getAllStudents():Promise<Student[]>{
    return studentDao.getAllStudents();
}
export function getStudentByID(id :number):Promise<Student>{
    return studentDao.getStudentByID(id);
}
export function saveStudent(student):Promise<Student>{
    const newStudent = new Student(undefined, student.first_name, student.last_name, student.major);
    if (newStudent.firstName&&newStudent.lastName){
        return studentDao.saveStudent(newStudent);
    }
    else{
        console.log("invalid student");
        return new Promise((resolve, reject)=> reject(422));
    }
}
export function patchStudent(student:any):Promise<Student>{
    const newStudent = new Student(
        student.id, student.first_name, student.last_name, student.major
    );
    if (!newStudent.id){
        throw new Error('400');
    }
    return studentDao.patchStudent(newStudent);
}
export function getClassesByStudent(id :number):Promise<Classes[]>{
    return studentDao.getClassesbyStudent(id);
}
export function delStudent(id:number):Promise<Student>{
    return studentDao.delStudent(id);
}