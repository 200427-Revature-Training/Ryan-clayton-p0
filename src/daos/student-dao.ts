import { db } from "./db";
import { Student, StudentRow } from "../models/student";




export function getAllStudents(): Promise<Student[]>{
    const sql = 'select * from students;';
    return db.query<StudentRow>(sql, []).then(result => {
        return result.rows.map(row => Student.from(row));
    });
}
export function getStudentByID(id: number):Promise<Student>{
    const sql = `select * from students where sid = $1`;
    return db.query<StudentRow>(sql,[id])
        .then(result => result.rows.map(r=> Student.from(r))[0]);

}
export function saveStudent(student: any):Promise<Student>{
    const sql = `insert into students (first_name,last_name,major) values($1,$2,$3) returning *`;
    return db.query<StudentRow>(sql,[student.firstName,student.lastName,student.major])
        .then(result => result.rows.map(r=> Student.from(r))[0]);

}
export function patchStudent(student:any):Promise<Student>{
    const sql = `Update students set first_name = coalesce($1, first_name),
     last_name = coalesce($2,last_name), major = coalesce($3,major) where sid = $4 returning *`;
     return db.query<StudentRow>(sql,[student.firstName,student.lastName,student.major,student.id])
        .then(result => result.rows.map(r=> Student.from(r))[0]);}