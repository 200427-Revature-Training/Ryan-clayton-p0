import express from 'express';

export const courseRouter = express.Router();

let courses =[{
    courseName: 'CS187',
    department: 'Computer Science',
    description: 'Into to data structures with java'
}]

courseRouter.get('', (request, response, next) => {
    console.log('Request received - processing at app.student.get');
    response.json(courses);
    next();
})

courseRouter.post('', (request, response, next) => {
    const body = request.body;
    if (body) {
        courses.push(body);
    }
    console.log('Request received - processing at app.student.post');
    response.send('Processed by app.post');
    next();
})