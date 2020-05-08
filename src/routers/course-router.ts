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
courseRouter.get('/:id',(request, response ,next)=>{
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

