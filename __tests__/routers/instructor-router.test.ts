import express from 'express';
import bodyParser from 'body-parser';
import { instructorRouter } from '../../src/routers/instructor-router';
import * as instructorService from '../../src/services/instructor-services';
import request from 'supertest';

jest.mock('../../src/services/instructor-services');
const mockInstructorService = instructorService as any;

// Setup Express server and middleware
const app = express();
app.use(bodyParser.json())
app.use('/instructor', instructorRouter);

describe('GET /instructor', () => {
    test('Returns normally under normal circumstances', async () => {
        mockInstructorService.getAllInstructors.mockImplementation(async () => []);
        await request(app)
            // if we send a request to GET "/"
            .get('/instructor')
            // We expect a response with status of 200
            .expect(200)
            // and of content-type JSON
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test('Returns normally under normal circumstances', async () => {
        mockInstructorService.getAllInstructors.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/instructor')
            .expect(500);
    });
});
describe('POST /instructor', () => {
    test('Successful creation should return 201 status', async () => {
        mockInstructorService.saveInstructor.mockImplementation(async () => ({}));
        const payload = {
            firstName: 'John',
            lastName: 'Smith',
            department: 'test'
        };

        await request(app)
            .post('/instructor')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {
        mockInstructorService.saveInstructor.mockImplementation(async () => {throw new Error()});

        const payload = {
            firstName: 'John',
            lastName: 'Smith',
            department: 'test'
        };

        await request(app)
            .post('/instructor')
            .send(payload)
            .expect(500);
    });
});
describe('GET instructor/:id', () => {
    test('Normal behavior Json with status 200', async () => {
        mockInstructorService.getInstructorByID
            .mockImplementation(async () => ({}));

        await request(app)
            .get('/instructor/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockInstructorService.getInstructorByID
        .mockImplementation(async () => (0));

        await request(app)
            .get('/instructor/NaN')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockInstructorService.getInstructorByID
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/instructor/999')
            .expect(500)
    })
})
describe('GET /instructor/classes/:id', () => {
    test('Returns normally under normal circumstances', async () => {
        mockInstructorService.getClassesByInstructor.mockImplementation(async () => []);
        await request(app)
            // if we send a request to GET "/"
            .get('/instructor/classes/1')
            // We expect a response with status of 200
            .expect(200)
            // and of content-type JSON
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test('Returns normally under normal circumstances', async () => {
        mockInstructorService.getClassesByInstructor.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/instructor/classes/1')
            .expect(500);
    });
});
describe('GET instructor/classes/:id', () => {
    test('Normal behavior Json with status 200', async () => {
        mockInstructorService.getClassesByInstructor
            .mockImplementation(async () => ({}));

        await request(app)
            .get('/instructor/classes/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockInstructorService.getClassesByInstructor
        .mockImplementation(async () => (0));

        await request(app)
            .get('/instructor/classes/NaN')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockInstructorService.getClassesByInstructor
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/instructor/classes/999')
            .expect(500)
    })
})



