import express from 'express';

export const studentRouter = express.Router();

let students = [{
    firstName: 'Ryan',
    lastName: 'Clayton',
    major: 'Computer Science',
    SIDnumber: 1
}]

studentRouter.get('', (request, response, next) => {
    console.log('Request received - processing at app.student.get');
    response.json(students);
    next();
})
studentRouter.get('/:id',(request,response,next)=>{
    const id = parseInt(request.params.id);
    const student = students.filter((student)=> student.SIDnumber==id)[0];
    if (!student){
        response.sendStatus(404);
    }else{
        response.json(student);
    }
    next();
})

studentRouter.post('', (request, response, next) => {
    const body = request.body;
    if (body) {
        students.push(body);
    }
    console.log('Request received - processing at app.student.post');
    response.send('Processed by app.post');
    next();
})