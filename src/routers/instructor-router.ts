import express from 'express';
import * as instructorService from '../services/instructor-services';

import { Instructor } from '../models/instructor';

export const instructorRouter = express.Router();




instructorRouter.get('', (request, response , next) => {
    console.log('inside student')
    instructorService.getAllInstructors().then(instructor=>{
        response.json(instructor);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    })
})
