import { db } from "./db";
import { Student, StudentRow } from "../models/student";
import { Classes,ClassesRow } from "../models/student-classes";




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

export function getClassesbyStudent(id:number):Promise<Classes[]>{
    const sql = 
    `select courses.description, instructors.department,
    instructors.first_name as instructor_first_name, instructors.last_name as instructor_last_name,
    courses.course_name 
    from classes inner join courses on classes.cid = courses.cid 
    inner join instructors on instructors.iid = classes.iid 
    inner join students on students.sid = classes.sid
    where students.sid = $1;`;
    return db.query<ClassesRow>(sql, [id]).then(result => {
        return result.rows.map(row => Classes.from(row));
    });
}