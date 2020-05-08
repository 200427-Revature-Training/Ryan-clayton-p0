import { db } from "./db";
import { Instructor, InstructorRow } from "../models/instructor";




export function getAllInstructors(): Promise<Instructor[]>{
    const sql = 'select * from instructors;';
    console.log('we made it this far');
    return db.query<InstructorRow>(sql, []).then(result => {
        return result.rows.map(row => Instructor.from(row));
    });
}
export function getInstructorByID(id: number):Promise<Instructor>{
    const sql = `select * from instructors where iid = $1`;
    return db.query<InstructorRow>(sql,[id])
        .then(result => result.rows.map(r=> Instructor.from(r))[0]);

}
export function saveInstructor(instructor: any):Promise<Instructor>{
    const sql = `insert into instructors (first_name,last_name,major) values($1,$2,$3) returning *`;
    return db.query<InstructorRow>(sql,[instructor.first_name,instructor.last_name,instructor.major])
    .then(result => result.rows.map(r=> Instructor.from(r))[0]);

}