import express, { response } from 'express';
import * as studentService from '../services/student-services';
import {Student} from '../models/student'

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
})
/*select student where id = id */
studentRouter.get('/:id',(request, response ,next)=>{
    const id = +request.params.id;
    const student:Student = studentService.getStudentByID(id);
    if (!student){// student id doesnt exist in DB
        response.sendStatus(404);
    }else{// returns the student
        response.json(student);
    }
    next();
})
/*create new student */
studentRouter.post('', (request, response, next) => {
    const student = request.body;
    const createdStudent = studentService.saveStudent(student)
    response.status(201);
    response.json(createdStudent);
    next();
})

