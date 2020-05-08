export class Course{
    id:number;
    courseName: string;
    department: string;
    description: string;

    static from(obj: CourseRow){
        const student = new Course(
            obj.cid, obj.course_name, obj.department, obj.description
        );
        return student
    }
    constructor(id: number, courseName: string, department:string, description: string){
        this.id = id;
        this.courseName=courseName;
        this.department=department;
        this.description=description;
    }

}
export interface CourseRow{
    cid:number;
    course_name: string;
    department: string;
    description: string;
}