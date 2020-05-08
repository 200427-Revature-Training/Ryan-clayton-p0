export class Instructor{
    id:number;
    firstName: string;
    lastName: string;
    department: string;

    static from(obj: InstructorRow){
        const student = new Instructor(
            obj.iid, obj.first_name, obj.last_name, obj.department
        );
        return student
    }
    constructor(id: number, firstName: string, lastName:string, department: string){
        this.id = id;
        this.firstName=firstName;
        this.lastName=lastName;
        this.department=department;
    }

}
export interface InstructorRow{
    iid:number;
    first_name: string;
    last_name: string;
    department: string;
}