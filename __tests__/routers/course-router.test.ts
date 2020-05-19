import express from 'express';
import bodyParser from 'body-parser';
import { courseRouter } from '../../src/routers/course-router';
import * as courseService from '../../src/services/course-services';
import request from 'supertest';

jest.mock('../../src/services/course-services');
const mockCourseService = courseService as any;

// Setup Express server and middleware
const app = express();
app.use(bodyParser.json())
app.use('/course', courseRouter);

describe('GET /course', () => {
    test('Returns normally under normal circumstances', async () => {
        mockCourseService.getAllCourses.mockImplementation(async () => []);
        await request(app)
            // if we send a request to GET "/"
            .get('/course')
            // We expect a response with status of 200
            .expect(200)
            // and of content-type JSON
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test('Returns normally under normal circumstances', async () => {
        mockCourseService.getAllCourses.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/course')
            .expect(500);
    });
});

describe('POST /course', () => {
    test('Successful creation should return 201 status', async () => {
        mockCourseService.saveCourse.mockImplementation(async () => ({}));
        const payload = {
            courseName: 'John',
            department: 'Smith',
            description: 'test'
        };

        await request(app)
            .post('/course')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {
        mockCourseService.saveCourse.mockImplementation(async () => {throw new Error()});

        const payload = {
            courseName: 'John',
            department: 'Smith',
            description: 'test'
        };

        await request(app)
            .post('/course')
            .send(payload)
            .expect(500);
    });
});
describe('GET course/id/:id', () => {
    test('Normal behavior Json with status 200', async () => {
        mockCourseService.getCourseByID
            .mockImplementation(async () => ({}));

        await request(app)
            .get('/course/id/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockCourseService.getCourseByID
        .mockImplementation(async () => (0));

        await request(app)
            .get('/course/id/NaN')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockCourseService.getCourseByID
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/course/id/999')
            .expect(500)
    })
})
describe('GET course/list/:id', () => {
    test('Normal behavior Json with status 200', async () => {
        mockCourseService.getCourseList
            .mockImplementation(async () => ({}));

        await request(app)
            .get('/course/list/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockCourseService.getCourseList
        .mockImplementation(async () => (0));

        await request(app)
            .get('/course/list/NaN')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockCourseService.getCourseList
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/course/list/999')
            .expect(500)
    })
});
describe('GET /course/classlist', () => {
    test('Returns normally under normal circumstances', async () => {
        mockCourseService.getClassList.mockImplementation(async () => []);
        await request(app)
            // if we send a request to GET "/"
            .get('/course/classlist/')
            // We expect a response with status of 200
            .expect(200)
            // and of content-type JSON
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test('Returns normally under normal circumstances', async () => {
        mockCourseService.getClassList.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/course/classlist/')
            .expect(500);
    });
});

describe('POST /course/enroll', () => {
    test('Successful creation should return 201 status', async () => {
        mockCourseService.addClass.mockImplementation(async () => ({}));
        const payload = {
            sid: 2,
            iid: 2,
            cid: 1
        };

        await request(app)
            .post('/course/enroll/')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {
        mockCourseService.addClass.mockImplementation(async () => {throw new Error()});

        const payload = {
            sid: 2,
            iid: 2,
            cid: 1
        };

        await request(app)
            .post('/course/enroll')
            .send(payload)
            .expect(500);
    });
});