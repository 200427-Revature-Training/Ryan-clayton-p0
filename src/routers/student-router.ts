import express, { response } from 'express';
import { userInfo } from 'os';

export const studentRouter = express.Router();


let students = [{
    id: 1,
    firstName: 'Ryan',
    lastName: 'Clayton',
    major: 'Computer Science'
    
}]

studentRouter.get('', (request, response, next) => {
    console.log('Request received - processing at app.student.get');
    response.json(students);
    next();
})
/*
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
    if (!student){
        response.sendStatus(404);
    }else{
        response.json(student);
    }
    next();
})


studentRouter.post('', (request, response, next) => {
    const body = request.body;
    body.id = students.reduce((a,b) => a.id > b.id ? a:b).id +1;
    if (body && body.firstName) {
        students.push(body);
    }
    console.log('Request received - processing at app.student.post');
    response.status(201);
    response.send('Processed by app.post');
    next();
})

studentRouter.put('',(request, respose, next)=>{
    const body = request.body;

    if (body.id || body.id <1){
        response.sendStatus(422);
        next();
        return;
    }
    let existingIndex: number | undefined = undefined;

    for(const i in students){
        if (students[i].id === body.id){
            existingIndex = parseInt(i);
            break;
        }
    }
    if (existingIndex){
        students[existingIndex]=body;
    }else{
        students.push(body);
        response.status(201);
    }
    response.json(body);
    
});
studentRouter.delete('/:id', (request, response, next)=>{
    const id = parseInt(request.params.id);
    const studentIdx = students.findIndex((students)=> students.id === id);
    console.log(id);
    console.log(studentIdx);
    if (studentIdx ===-1){
        response.sendStatus(404);
        next();
        return;
    }
    const student = students.splice(studentIdx, 1)[0];
    response.json(student);
});
//export default studentMiddleware