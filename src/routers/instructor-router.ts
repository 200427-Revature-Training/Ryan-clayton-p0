import express from 'express';

export const instructorRouter = express.Router();

let instructor = [{
    firstName: 'Tim',
    lastName: 'Richards',
    department: 'Computer Science',
    FIDnumber: 1,
}]


instructorRouter.get('', (request, response, next) => {
    console.log('Request received - processing at app.student.get');
    response.json(instructor);
    next();
})

instructorRouter.post('', (request, response, next) => {
    const body = request.body;
    if (body) {
        instructor.push(body);
    }
    console.log('Request received - processing at app.student.post');
    response.send('Processed by app.post');
    next();
})