export class Student{
    id:number;
    firstName: string;
    lastName: string;
    major: string;

    static from(obj: StudentTable){
        const student = new Student(
            obj.id, obj.first_Name, obj.last_Name, obj.major
        );
        return student
    }
    constructor(id: number, firstName: string, lastName:string, major: string){
        this.id = id;
        this.firstName=firstName;
        this.lastName=lastName;
        this.major=major;
    }

}
interface StudentTable{
    id:number;
    first_Name: string;
    last_Name: string;
    major: string;
}