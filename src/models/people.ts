export class People{
    firstName: string;
    lastName: string;

    static from(obj: ClassList){
        const student = new People(
            obj.first_name, obj.last_name
        );
        return student
    }
    constructor(firstName: string, lastName:string){
        this.firstName=firstName;
        this.lastName=lastName;

    }

}
export interface ClassList{
    first_name: string;
    last_name: string;
}