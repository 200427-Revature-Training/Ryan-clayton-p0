import { Student } from "../models/student";
import * as studentDao from '../daos/student-dao';

export function getAllStudents():Promise<Student[]>{
    return studentDao.getAllStudents();
}
export function getStudentByID(id :number):Promise<Student>{
    return studentDao.getStudentByID(id);
}
export function saveStudent(student):Promise<Student>{
    const newStudent = new Student(undefined, student.first_name, student.last_name, student.major);
    if (newStudent.first_name&&newStudent.last_name){
        return studentDao.saveStudent(newStudent);
    }
    else{
        console.log("invalid person");
        return new Promise((resolve, reject)=> reject(422));
    }
}