/* istanbul ignore file */
export class InstructorClasses{
    numberOfStudents:number;
    coursename: string;

    static from(obj: InstructorClassesRow){
        const CL = new InstructorClasses(
            obj.course_name, obj.number_of_students
        );
        return CL
    }
    constructor(courseName: string, numberOfStudents: number){
        this.numberOfStudents = numberOfStudents;
        this.coursename=courseName;
    }

}
export interface InstructorClassesRow{
    number_of_students:number;
    course_name: string;
}