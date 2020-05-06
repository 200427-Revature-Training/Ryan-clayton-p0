import express from 'express';

export const classRouter = express.Router();

let classes = [{
    courseName: 'CS187',
    FacultyID: 1,
    students: [1]
}]
classRouter.get('', (request, response, next) => {
    console.log('Request received - processing at app.student.get');
    response.json(classes);
    next();
})

classRouter.post('', (request, response, next) => {
    const body = request.body;
    if (body) {
        classes.push(body);
    }
    console.log('Request received - processing at app.student.post');
    response.send('Processed by app.post');
    next();
})