import express from 'express';
import bodyParser from 'body-parser';
import { studentRouter } from './routers/student-router';
import { instructorRouter } from './routers/instructor-router';
import { courseRouter } from './routers/course-router';
import { classRouter } from './routers/class-router';

const app = express();

const port = process.env.PORT || 3000;
app.set('port', port);

// first middleware
app.use(bodyParser.json());


app.use((request, response, next) => {
    //the express app is open and in middleware2
    console.log('Hello world');
    next();
})
/*array datastucture declarations!!
    some added sample data as well
*/



/*Routers!!*/

app.use('/student',studentRouter);

app.use('/instructor',instructorRouter);
app.use('/course',courseRouter);
app.use('/class',classRouter);




// starts the express app

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`)
});