import * as courseService from '../../src/services/course-services';
import * as courseDao from '../../src/daos/course-dao';
import {Course} from '../../src/models/course'
import {ClassList} from '../../src/models/classList'

jest.mock('../../src/daos/course-dao')

const mockCourseDao = courseDao as any;

describe('saveCourse', () => {
    test('422 returned if no course_name provided', async () => {
        // peopleDao.saveCourse will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockCourseDao.saveCourse.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });

        const payload = {
            department: 'Smith',
            description: 'Testing'
        }

        try {
            // This async function should reject due to missing course_name
            await courseService.saveCourse(payload);
            fail('courseService.saveCourse did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });
    test('422 returned if no department provided', async () => {
        // peopleDao.saveCourse will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockCourseDao.saveCourse.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });

        const payload = {
            course_name: 'Smith',
            description: 'Testing'
        }

        try {
            // This async function should reject due to missing course_name
            await courseService.saveCourse(payload);
            fail('courseService.saveCourse did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });
    test('Courses are allowed empty description Input object transformed to Course object', async () => {
        // peopleDao.saveCourse will return undefined rather than execute
        // Stubbing - Replacing a method with a fake method implementation
        mockCourseDao.saveCourse.mockImplementation(o => o);


        const payload = {
            department: 'Smith',
            course_name: 'John'
        }

        const result = await courseService.saveCourse(payload);
        expect(payload).not.toBeInstanceOf(Course);
        console.log(payload);
        expect(result).toBeInstanceOf(Course);
    });

    test('Input object transformed to Course object', async () => {
        mockCourseDao.saveCourse.mockImplementation(o => o);

        const payload = {
            course_name: 'John',
            department: 'Smith',
            description: 'testing'
        };

        const result = await courseService.saveCourse(payload);
        expect(payload).not.toBeInstanceOf(Course);
        expect(result).toBeInstanceOf(Course);
    });
    test('ID value of input is replaced in output', async () => {
        mockCourseDao.saveCourse.mockImplementation(o => o);

        const payload = {
            id: 15,
            course_name: 'John',
            department: 'Smith',
            description: 'testing'
        };

        const result = await courseService.saveCourse(payload);

        expect(result.id).not.toBe(payload.id);
    });

    test('Extraneous fields in input are not in output', async () => {
        mockCourseDao.saveCourse.mockImplementation(o => o);

        const payload = {
            course_name: 'John',
            department: 'Smith',
            description: 'testing',
            likesSkateboards: true
        };

        const result = await courseService.saveCourse(payload) as any;

        expect(result.likesSkateboards).not.toBeDefined();
    });

});

describe('patchCourse', () => {
    /* Testing behavior of patchCourse */
    /*
        1. When a valid patch with an id property is provied, patch succeeds
            returning a truthy object.
        2. When a patch with no id property is provided, an error should be thrown.
    */

    test('successful patch', async () => {
        expect.assertions(1);

        mockCourseDao.patchCourse
            .mockImplementation(() => ({}));

        const payload = {
            id: 1,
            course_name: 'Abby',
            department: 'Adams',
            majpr: '2020-01-01'
        };

        const result = await courseService.patchCourse(payload);
        expect(result).toBeTruthy();
    });

    test('patch fails when no valid id is provided', async () => {
        expect.assertions(1);

        mockCourseDao.patchCourse
            .mockImplementation(() => ({}));

        const payload = {
            course_name: 'Abby',
            department: 'Adams',
            majpr: '2020-01-01'
        };

        try {
            await courseService.patchCourse(payload);
            fail();
        } catch(err) {
            expect(err).toBeTruthy();
        }
    });
});

describe('addClass', () => {
    test('422 returned if no sid provided', async () => {
        // peopleDao.saveCourse will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockCourseDao.addClass.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });

        const payload = {
            iid: 1,
            cid:1
        }

        try {
            // This async function should reject due to missing course_name
            await courseService.addClass(payload);
            fail('courseService.saveCourse did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });
    test('422 returned if no iid provided', async () => {
        // peopleDao.saveCourse will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockCourseDao.addClass.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });

        const payload = {
            sid:1,
            cid: 1
        }

        try {
            // This async function should reject due to missing course_name
            await courseService.addClass(payload);
            fail('courseService.saveCourse did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
    });
        // Validate that error was thrown
    test('422 returned if no cid provided', async () => {
            // peopleDao.saveCourse will return undefined rather than execute
            expect.assertions(1);
            // Stubbing - Replacing a method with a fake method implementation
            mockCourseDao.addClass.mockImplementation(() => {
                console.log('This is what mock dao actually calls');
            });
    
            const payload = {
                sid:1,
                iid: 1
            }
    
            try {
                // This async function should reject due to missing course_name
                await courseService.addClass(payload);
                fail('courseService.saveCourse did not throw expected error');
            } catch(err) {
                // assign error object to expectedError
                expect(err).toBeDefined();
            }
            // Validate that error was thrown
        });

    test('Input object transformed to Course object', async () => {
        mockCourseDao.addClass.mockImplementation(o => o);

        const payload = {
            iid: 1,
            sid: 1,
            cid: 1
        };

        const result = await courseService.addClass(payload);
        console.log(result);
        expect(result).toBeDefined();
    });


    test('Extraneous fields in input are not in output', async () => {
        mockCourseDao.addClass.mockImplementation(o => o);

        const payload = {
            iid: 1,
            sid: 1,
            cid: 1,
            likesSkateboards: true
        };

        const result = await courseService.addClass(payload) as any;

        expect(result.likesSkateboards).not.toBeDefined();
    });

});