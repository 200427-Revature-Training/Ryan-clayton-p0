import { db } from "./db";
import { Student, StudentRow } from "../models/student";




export function getAllStudents(): Promise<Student[]>{
    const sql = 'select * from students;';
    console.log('we made it this far');
    return db.query<StudentRow>(sql, []).then(result => {
        return result.rows.map(row => Student.from(row));
    });
}
export function getStudentByID(id: number):Student{
    return null;

}
export function saveStudent(student: any):Student{
    return null;
}