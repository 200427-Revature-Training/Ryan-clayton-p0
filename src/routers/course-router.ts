import express from 'express';
import * as courseService from '../services/course-services';
export const courseRouter = express.Router();


/*This get requests returns the entire course DB */
courseRouter.get('', (request, response , next) => {
    courseService.getAllCourses().then(courses=>{

        response.json(courses);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    })
});
/*select Course where id = id */
courseRouter.get('/id/:id/',(request, response ,next)=>{
    const id = +request.params.id;
    courseService.getCourseByID(id).then(course =>{
        if (!course){// course id doesnt exist in DB
            response.sendStatus(404);
        }else{// returns the course
            response.json(course);
        }
        next();
    }).catch(err=>{
        console.log(err);
        response.sendStatus(500);
        next();
    });
});
/*create new course */
courseRouter.post('', (request, response, next) => {
    const course = request.body;
    console.log(course);
    courseService.saveCourse(course).then(newCourse=>{
        response.status(201);
        response.json(newCourse);
        next();
    }).catch(err=>{
        console.log(err);
        response.sendStatus(500);
        next();
    });

});

courseRouter.patch('',(request,response,next)=>{
    const course = request.body;
    courseService.patchCourse(course).then(newCourse =>{
        response.status(201);
        response.json(newCourse);
        next();
    }).catch(err=>{
        console.log(err);
        response.sendStatus(500);
        next();
    });
});

courseRouter.get('/list/:id',(request, response ,next)=>{
    const id = +request.params.id;
    courseService.getCourseList(id).then(course =>{
        if (!course){// course id doesnt exist in DB
            response.sendStatus(404);
        }else{// returns the course
            response.json(course);
        }
        next();
    }).catch(err=>{
        console.log(err);
        response.sendStatus(500);
        next();
    });
});
courseRouter.post('/enroll/', (request, response, next) => {
    const classroom = request.body;
    courseService.addClass(classroom).then(newCourse=>{
        response.status(201);
        response.json(newCourse);
        next();
    }).catch(err=>{
        console.log(err);
        response.sendStatus(500);
        next();
    });

});
courseRouter.get('/classlist/', (request, response , next) => {
    courseService.getClassList().then(courses=>{
        response.json(courses);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    })
});
courseRouter.delete('/delete/:id',(request,response,next)=>{
    const id = +request.params.id;
    courseService.delCourse(id).then(newCourse =>{
        response.status(201);
        response.json(newCourse);
        next();
    }).catch(err=>{
        console.log(err);
        response.sendStatus(500);
        next();
    });
});
courseRouter.delete('/class/delete',(request,response,next)=>{
    const classroom = request.body;
    courseService.delClass(classroom).then(newCourse =>{
        response.status(201);
        response.json(newCourse);
        next();
    }).catch(err=>{
        console.log(err);
        response.sendStatus(500);
        next();
    });
});