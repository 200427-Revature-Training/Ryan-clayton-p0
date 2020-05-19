import { db } from "./db";
import { Course, CourseRow } from "../models/course";
import { People, peopleList} from "../models/people";
import { Classroom, ClassroomRow } from "../models/class";
import { ClassList, ClassListRow} from "../models/classList"



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
    const sql = `insert into courses (course_name,department,description) values($1,$2,$3) returning *`;
    return db.query<CourseRow>(sql,[course.courseName,course.department,course.description])
        .then(result => result.rows.map(r=> Course.from(r))[0]);

}
export function patchCourse(course:any):Promise<Course>{
    const sql = `Update courses set course_name = coalesce($1, course_name),
     department = coalesce($2,department), description = coalesce($3,description) where cid = $4 returning *`;
     return db.query<CourseRow>(sql,[course.courseName,course.department,course.description,course.id])
        .then(result => result.rows.map(r=> Course.from(r))[0]);}

export function getCourseListByID(id:number):Promise<People[]>{
    const sql = `select students.first_name , students.last_name
    from classes inner join courses on classes.cid = courses.cid 
    inner join students on students.sid = classes.sid
    where classes.cid = $1
    union
    select instructors.first_name , instructors.last_name
    from classes inner join courses on classes.cid = courses.cid 
    inner join instructors on instructors.iid = classes.iid 
    where classes.cid = $2 ;`
    return db.query<peopleList>(sql, [id, id]).then(result => {
        return result.rows.map(row => People.from(row));
    });

}

export function addClass(sid:number,iid:number,cid:number):Promise<Classroom>{
    const sql = `insert into classes (cid,iid,sid) values($1,$2,$3)`
    return db.query<ClassroomRow>(sql,[cid,iid,sid])
        .then(result => result.rows.map(r=> Classroom.from(r))[0]);
    }

export function getAllClasses(): Promise<ClassList[]>{
    const sql = `select  concat( students.first_name,' ' ,students.last_name) as student_name,
    concat(instructors.first_name,' ', instructors.last_name) as instructor_name,
    courses.course_name, courses.description 
    from classes inner join courses on classes.cid = courses.cid 
    inner join instructors on instructors.iid = classes.iid 
    inner join students on students.sid = classes.sid;`;
    return db.query<ClassListRow>(sql, []).then(result => {
        return result.rows.map(row => ClassList.from(row));
    });
}