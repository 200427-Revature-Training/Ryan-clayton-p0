/* istanbul ignore file */
import { db } from "./db";
import { Instructor, InstructorRow } from "../models/instructor";
import { InstructorClasses,InstructorClassesRow } from "../models/instructor-classes";




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
    const sql = `insert into instructors (first_name,last_name,department) values($1,$2,$3) returning *`;
    console.log(instructor);
    return db.query<InstructorRow>(sql,[instructor.firstName,instructor.lastName,instructor.department])
    .then(result => result.rows.map(r=> Instructor.from(r))[0]);
}
export function patchInstructor(instructor:any):Promise<Instructor>{
    const sql = `Update instructors set first_name = coalesce($1, first_name),
     last_name = coalesce($2,last_name), department = coalesce($3,department) where iid = $4 returning *`;
     return db.query<InstructorRow>(sql,[instructor.firstName,instructor.lastName,instructor.department,instructor.id])
     .then(result => result.rows.map(r=> Instructor.from(r))[0]);}

export function getClassesbyInstructor(id:number):Promise<InstructorClasses[]>{
    const sql = 
    `select courses.course_name, count(*) as Number_of_instructors
    from classes inner join courses on classes.cid = courses.cid 
    inner join instructors on instructors.iid = classes.iid 
    inner join instructors on instructors.sid = classes.sid
    where instructors.iid = $1 group by courses.cid;`;
    return db.query<InstructorClassesRow>(sql, [id]).then(result => {
        return result.rows.map(row => InstructorClasses.from(row));
    });
}
export function delInstructor(id:number):Promise<Instructor>{
    const sql = `delete from instructors where iid = $1 returning *`;
    return db.query<InstructorRow>(sql,[id])
        .then(result => result.rows.map(r=> Instructor.from(r))[0]);
}