export class Classes{
    coursename: string;
    description: string;
    department: string;
    instructorFirstName: string;
    instructorLastName: string;

    static from(obj: ClassesRow){
        const CL = new Classes(
            obj.description, obj.department, 
            obj.instructor_first_name, obj.instructor_last_name, obj.course_name
        );
        return CL
    }
    constructor(description: string, department: string,instructorFirstName: string, 
        instructorLastName: string, courseName: string){
        this.coursename=courseName;
        this.description= description;
        this.department=department;
        this.instructorFirstName= instructorFirstName;
        this.instructorLastName=instructorLastName;
    }

}
export interface ClassesRow{
    description: string;
    instructor_first_name: string;
    department: string;
    instructor_last_name: string;
    course_name: string;
}