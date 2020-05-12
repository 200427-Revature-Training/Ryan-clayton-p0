import { db } from "./db";
import { Course, CourseRow } from "../models/course";
import { People, ClassList} from "../models/people";



export function getAllCourses(): Promise<Course[]>{
    const sql = 'select * from courses;';
    return db.query<CourseRow>(sql, []).then(result => {
        return result.rows.map(row => Course.from(row));
    });
}
export function getCourseByID(id: number):Promise<Course>{
    const sql = `select * from courses where cid = $1`;
    return db.query<CourseRow>(sql,[id])
        .then(result => result.rows.map(r=> Course.from(r))[0]);

}
export function saveCourse(course: any):Promise<Course>{
    console.log(course);
    const sql = `insert into courses (course_name,department,description) values($1,$2,$3) returning *`;
    return db.query<CourseRow>(sql,[course.courseName,course.department,course.description])
        .then(result => result.rows.map(r=> Course.from(r))[0]);

}
export function patchCourse(course:any):Promise<Course>{
    const sql = `Update courses set course_name = coalesce($1, course_name),
     department = coalesce($2,department), description = coalesce($3,description) where cid = $4 returning *`;
     return db.query<CourseRow>(sql,[course.courseName,course.department,course.description,course.id])
        .then(result => result.rows.map(r=> Course.from(r))[0]);}

export function getClassListByID(id:number):Promise<People[]>{
    const sql = `select students.first_name , students.last_name
    from classes inner join courses on classes.cid = courses.cid 
    inner join students on students.sid = classes.sid
    where classes.cid = $1
    union
    select instructors.first_name , instructors.last_name
    from classes inner join courses on classes.cid = courses.cid 
    inner join instructors on instructors.iid = classes.iid 
    where classes.cid = $2 ;`
    return db.query<ClassList>(sql, [id, id]).then(result => {
        return result.rows.map(row => People.from(row));
    });

}