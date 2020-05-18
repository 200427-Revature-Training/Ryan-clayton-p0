import express, { response } from 'express';
import * as studentService from '../services/student-services';
import {Classes} from '../models/student-classes'
export const studentRouter = express.Router();//create + export express router



/*This get requests returns the entire student DB */
studentRouter.get('', (request, response , next) => {
    console.log('inside student')
    studentService.getAllStudents().then(students=>{
        response.json(students);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    })
});
/*select student where id = id */
studentRouter.get('/:id',(request, response ,next)=>{
    const id = +request.params.id;
    studentService.getStudentByID(id).then(student =>{
        if (!student){// student id doesnt exist in DB
            response.sendStatus(404);
        }else{// returns the student
            response.json(student);
        }
        next();
    }).catch(err=>{
        console.log(err);
        response.sendStatus(500);
        next();
    });
   
});
/*create new student */
studentRouter.post('', (request, response, next) => {
    const student = request.body;
    studentService.saveStudent(student).then(newStudent=>{
        response.status(201);
        response.json(newStudent);
        next();
    }).catch(err=>{
        console.log(err);
        response.sendStatus(500);
        next();
    });

});

studentRouter.patch('',(request,response,next)=>{
    const student = request.body;
    studentService.patchStudent(student).then(newStudent =>{
        response.status(201);
        response.json(newStudent);
        next();
    }).catch(err=>{
        console.log(err);
        response.sendStatus(500);
        next();
    });
});
/*
studentRouter.get('/classes/:id',async (request, response ,next)=>{
    const id = +request.params.id;
    studentService.getClassesByStudent(id).then(student =>{
        if (!student){// student id doesnt exist in DB
            response.sendStatus(404);
        }else{// returns the student
            response.json(student);
        }
        next();
    }).catch(err=>{
        console.log(err);
        response.sendStatus(500);
        next();
    });
});

*/
studentRouter.get('/classes/:id', async (request, response, next) => {
    const id: number = parseInt(request.params.id);

    let students: Classes[];

    try {
        students = await studentService.getClassesByStudent(id);
    } catch (err) {
        response.sendStatus(500);
        console.log(err);
        return;
    }

    // Dao returns undefined for non-existent person
    if (!students) {
        response.sendStatus(404);
    } else {
        response.json(students);
    }
    next();
});

