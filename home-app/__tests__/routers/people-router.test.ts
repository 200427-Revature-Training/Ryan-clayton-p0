import express from 'express';
import bodyParser from 'body-parser';
import { studentRouter } from '../../src/routers/student-router';
import * as studentService from '../../src/services/student-services';
import request from 'supertest';

jest.mock('../../src/services/student-services');
const mockStudentService = studentService as any;

// Setup Express server and middleware
const app = express();
app.use(bodyParser.json())
app.use('/student', studentRouter);

describe('GET /student', () => {
    test('Returns normally under normal circumstances', async () => {
        mockStudentService.getAllStudents.mockImplementation(async () => []);
        await request(app)
            // if we send a request to GET "/"
            .get('/student')
            // We expect a response with status of 200
            .expect(200)
            // and of content-type JSON
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test('Returns normally under normal circumstances', async () => {
        mockStudentService.getAllStudents.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/student')
            .expect(500);
    });
});

describe('POST /student', () => {
    test('Successful creation should return 201 status', async () => {
        mockStudentService.saveStudent.mockImplementation(async () => ({}));
        const payload = {
            firstName: 'John',
            lastName: 'Smith',
            major: 'test'
        };

        await request(app)
            .post('/student')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {
        mockStudentService.saveStudent.mockImplementation(async () => {throw new Error()});

        const payload = {
            firstName: 'John',
            lastName: 'Smith',
            major: 'test'
        };

        await request(app)
            .post('/student')
            .send(payload)
            .expect(500);
    });
});
describe('GET student/:id', () => {
    test('Normal behavior Json with status 200', async () => {
        mockStudentService.getStudentByID
            .mockImplementation(async () => ({}));

        await request(app)
            .get('/student/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockStudentService.getStudentByID
        .mockImplementation(async () => (0));

        await request(app)
            .get('/student/NaN')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockStudentService.getStudentByID
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/student/999')
            .expect(500)
    })
})
describe('GET /student/classes/:id', () => {
    test('Returns normally under normal circumstances', async () => {
        mockStudentService.getClassesByStudent.mockImplementation(async () => []);
        await request(app)
            // if we send a request to GET "/"
            .get('/student/classes/1')
            // We expect a response with status of 200
            .expect(200)
            // and of content-type JSON
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test('Returns normally under normal circumstances', async () => {
        mockStudentService.getClassesByStudent.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/student/classes/1')
            .expect(500);
    });
});
describe('GET student/classes/:id', () => {
    test('Normal behavior Json with status 200', async () => {
        mockStudentService.getClassesByStudent
            .mockImplementation(async () => ({}));

        await request(app)
            .get('/student/classes/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockStudentService.getClassesByStudent
        .mockImplementation(async () => (0));

        await request(app)
            .get('/student/classes/NaN')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockStudentService.getClassesByStudent
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/student/classes/999')
            .expect(500)
    })
})
