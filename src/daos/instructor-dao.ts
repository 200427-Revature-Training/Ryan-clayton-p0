import { db } from "./db";
import { Instructor, InstructorRow } from "../models/instructor";




export function getAllInstructors(): Promise<Instructor[]>{
    const sql = 'select * from instructors;';
    console.log('we made it this far');
    return db.query<InstructorRow>(sql, []).then(result => {
        return result.rows.map(row => Instructor.from(row));
    });
}
export function getInstructorByID(id: number):Instructor{
    return null;

}
export function saveInstructor(instructor: any):Instructor{
    return null;
}