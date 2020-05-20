/* istanbul ignore file */
export class ClassList{
    coursename: string;
    description: string;
    instructorName: string;
    studentName: string;

    static from(obj: ClassListRow){
        console.log(obj);
        const CL = new ClassList(
            obj.student_name, obj.instructor_name, obj.course_name, obj.description
        );
        return CL
    }
    constructor(studentName: string, instructorName: string, 
        courseName: string, description: string){
        this.studentName=studentName;
        this.instructorName= instructorName;
        this.coursename=courseName;
        this.description= description;


    }

}
export interface ClassListRow{

    instructor_name: string;
    student_name: string;
    description: string;
    course_name: string;
}