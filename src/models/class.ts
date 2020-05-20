/* istanbul ignore file */
export class Classroom{
    cid:number;
    iid:number;
    sid:number;

    static from(obj: ClassroomRow){
        const student = new Classroom(
            obj.cid, obj.iid, obj.sid
        );
        return student
    }
    constructor(cid:number, iid:number, sid:number){
        this.cid = cid;
        this.iid = iid;
        this.sid = sid;

    }

}
export interface ClassroomRow{
    cid:number;
    iid:number;
    sid:number;

}