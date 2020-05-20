import express from 'express';
import * as instructorService from '../services/instructor-services';


export const instructorRouter = express.Router();




instructorRouter.get('', (request, response , next) => {
    instructorService.getAllInstructors().then(instructor=>{
        response.json(instructor);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    })
});

instructorRouter.get('/:id',(request, response ,next)=>{
    const id = +request.params.id;
    instructorService.getInstructorByID(id).then(instructor =>{
        if (!instructor){// instructor id doesnt exist in DB
            response.sendStatus(404);
        }else{// returns the instructor
            response.json(instructor);
        }
        next();
    }).catch(err=>{
        console.log(err);
        response.sendStatus(500);
        next();
    });
   
});

instructorRouter.post('', (request, response, next) => {
    const instructor = request.body;
    instructorService.saveInstructor(instructor).then(newInstructor=>{
        response.status(201);
        response.json(newInstructor);
        next();
    }).catch(err=>{
        console.log(err);
        response.sendStatus(500);
        next();
    });

});
instructorRouter.patch('',(request,response,next)=>{
    const instructor = request.body;
    instructorService.patchInstructor(instructor).then(newInstructor =>{
        response.status(201);
        response.json(newInstructor);
        next();
    }).catch(err=>{
        console.log(err);
        response.sendStatus(500);
        next();
    });
});

instructorRouter.get('/classes/:id',(request, response ,next)=>{
    const id = +request.params.id;
    instructorService.getClassesByInstructor(id).then(instructor =>{
        if (!instructor){// instructor id doesnt exist in DB
            response.sendStatus(404);
        }else{// returns the instructor
            response.json(instructor);
        }
        next();
    }).catch(err=>{
        console.log(err);
        response.sendStatus(500);
        next();
    });
});
instructorRouter.delete('/:id',(request,response,next)=>{
    const id = +request.params.id;
    instructorService.delInstructor(id).then(newInstructor =>{
        response.status(201);
        response.json(newInstructor);
        next();
    }).catch(err=>{
        console.log(err);
        response.sendStatus(500);
        next();
    });
});