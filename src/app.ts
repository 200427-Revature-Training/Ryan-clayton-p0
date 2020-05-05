import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const port = process.env.PORT || 3000;
app.set('port', port);

// first middleware
app.use(bodyParser.json());

app.use((request, response, next) => {
    //the express app is open here, this is the 2nd piece of middleware
    console.log('Hello world');
    next();
})
/*array datastucture declarations!!
    some added sample data as well
*/
let students = [{
    firstName: 'Ryan',
    lastName: 'Clayton',
    major: 'Computer Science',
    SIDnumber: 1
}]

let instructor = [{
    firstName: 'Tim',
    lastName: 'Richards',
    department: 'Computer Science',
    FIDnumber: 1,
}]
let courses =[{
    courseName: 'CS187',
    department: 'Computer Science',
    description: 'Into to data structures with java'
}]
let classes = [{
    courseName: 'CS187',
    FacultyID: 1,
    students: [1]
}]

/*GET methods!!*/
app.get('/student', (request, response, next) => {
    console.log('Request received - processing at app.student.get');
    response.json(students);
    next();
})


app.get('/instructor', (request, response, next) => {
    console.log('Request received - processing at app.instructor.get');
    response.json(instructor);
    next();
})


app.get('/courses', (request, response, next) => {
    console.log('Request received - processing at app.courses.get');
    response.json(courses);
    next();
})


app.get('/classes', (request, response, next) => {
    console.log('Request received - processing at app.classes.get');
    response.json(classes);
    next();
})

/*
POST methods!!! 
*/
//student post method
app.post('/student', (request, response, next) => {
    const body = request.body;
    if (body) {
        students.push(body);
    }
    console.log('Request received - processing at app.student.post');
    response.send('Processed by app.post');
    next();
})
//instructor post method
app.post('/instructor', (request, response, next) => {
    const body = request.body;
    if (body) {
        instructor.push(body);
    }
    console.log('Request received - processing at app.instructor.post');
    response.send('Processed by app.post');
    next();
})
//course post method
app.post('/courses', (request, response, next) => {
    const body = request.body;
    if (body) {
        courses.push(body);
    }
    console.log('Request received - processing at app.courses.post');
    response.send('Processed by app.post');
    next();
})
//class post method
app.post('/classes', (request, response, next) => {
    const body = request.body;
    if (body) {
        classes.push(body);
    }
    console.log('Request received - processing at app.classes.post');
    response.send('Processed by app.post');
    next();
})


app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`)
});