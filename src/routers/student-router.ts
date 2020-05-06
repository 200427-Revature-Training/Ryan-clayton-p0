import express, { response } from 'express';
import { userInfo } from 'os';

export const studentRouter = express.Router();

interface student{
    id:number;
    firstName: string;
    lastName: string;
    major: string;
}
//initilize our "database"
/** dummy stuent object
 * {
    "id": 1,
    "firstName": "Ryan",
    "lastName": "Clayton",
    "major": "Computer Science"
}
 */
let students: student[] = []

/*This get requests returns the entire student DB */
studentRouter.get('', (request, response, next) => {
    console.log('Request received - processing at app.student.get');
    response.json(students);
    next();
})
/*
this function will work if i change the address or use a regex

TODO: IMPLEMENT REGEX

studentRouter.get('/:name',(request,response,next)=>{
    const id = request.params.name;
    const student = students.filter((student)=> student.firstName==name)[0];
    if (!student){
        response.sendStatus(404);
    }else{
        response.json(student);
    }
    next();
})
*/
studentRouter.get('/:id',(request,response,next)=>{
    const id = parseInt(request.params.id);
    const student = students.filter((student)=> student.id==id)[0];
    if (!student){//student id doesnt exist in DB
        response.sendStatus(404);
    }else{// returns the student 
        response.json(student);
    }
    next();
})


studentRouter.post('', (request, response, next) => {
    const body = request.body;
    body.id = students.reduce((a,b) => a.id > b.id ? a:b).id +1;// sets ID to equal the highest current idx +1
    if (body && body.firstName) {//checks for valid content before pushing
        students.push(body);
    }
    console.log('Request received - processing at app.student.post');
    response.status(201);
    response.send('Processed by app.post');
    next();
})
/** PUT for creation and replacement if the ID has already been given**/
studentRouter.put('',(request, respose, next)=>{
    const body = request.body;

    if (body.id || body.id <1){// check valid ID in body
        response.sendStatus(422);
        next();
        return;
    }
    let existingIndex: number | undefined = undefined;

    for(const i in students){//checks for existing id in database
        if (students[i].id === body.id){
            existingIndex = parseInt(i);
            break;
        }
    }
    if (existingIndex){//updates the student based on ID
        students[existingIndex]=body;
    }else{// create new student
        students.push(body);
        response.status(201);
    }
    response.json(body);
    
});

/* delete user based on ID, this function currently requires students to be stored
as an array */
studentRouter.delete('/:id', (request, response, next)=>{
    const id = parseInt(request.params.id);
    const studentIdx = students.findIndex((students)=> students.id === id);//id lookup
    if (studentIdx ===-1){//checks for if the ID is not in students
        response.sendStatus(404);
        next();
        return;
    }
    const student = students.splice(studentIdx, 1)[0];//removes from database
    response.json(student);
});
//export default studentMiddleware