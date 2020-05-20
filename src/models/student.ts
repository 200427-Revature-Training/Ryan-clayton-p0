/* istanbul ignore file */
export class Student{
    id:number;
    firstName: string;
    lastName: string;
    major: string;

    static from(obj: StudentRow){
        const student = new Student(
            obj.sid, obj.first_name, obj.last_name, obj.major
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
export interface StudentRow{
    sid:number;
    first_name: string;
    last_name: string;
    major: string;
}