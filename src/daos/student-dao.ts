import { db } from "./db";
import { Student, StudentRow } from "../models/student";




export function getAllStudents(): Promise<Student[]>{
    const sql = 'select * from students;';
    return db.query<StudentRow>(sql, []).then(result => {
        return result.rows.map(row => Student.from(row));
    });
}
export function getStudentByID(id: number):Promise<Student>{
    const sql = `select * from students where sid = ${id}`;
    return db.query<StudentRow>(sql,[])
        .then(result => result.rows.map(r=> Student.from(r))[0]);

}
export function saveStudent(student: any):Promise<Student>{
    const sql = `insert into students (first_name,last_name,major) values('${student.first_name}','${student.last_name}','${student.major}') returning *`;
    return db.query<StudentRow>(sql,[]).then(result => result.rows.map(r=> Student.from(r))[0]);

}