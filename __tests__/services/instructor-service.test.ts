import * as instructorService from '../../src/services/instructor-services';
import * as instructorDao from '../../src/daos/instructor-dao';
import {Instructor} from '../../src/models/instructor'

jest.mock('../../src/daos/instructor-dao')

const mockInstructorDao = instructorDao as any;

describe('saveInstructor', () => {
    test('422 returned if no first_name provided', async () => {
        // peopleDao.saveInstructor will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockInstructorDao.saveInstructor.mockImplementation(() => {
        });

        const payload = {
            last_name: 'Smith',
            department: 'Testing'
        }

        try {
            // This async function should reject due to missing first_name
            await instructorService.saveInstructor(payload);
            fail('instructorService.saveInstructor did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });
    test('422 returned if no last_name provided', async () => {
        // peopleDao.saveInstructor will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockInstructorDao.saveInstructor.mockImplementation(() => {
        });

        const payload = {
            first_name: 'Smith',
            department: 'Testing'
        }

        try {
            // This async function should reject due to missing first_name
            await instructorService.saveInstructor(payload);
            fail('instructorService.saveInstructor did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });
    test('Instructors are allowed empty department Input object transformed to Instructor object', async () => {
        // peopleDao.saveInstructor will return undefined rather than execute
        // Stubbing - Replacing a method with a fake method implementation
        mockInstructorDao.saveInstructor.mockImplementation(o => o);


        const payload = {
            last_name: 'Smith',
            first_name: 'John'
        }

        const result = await instructorService.saveInstructor(payload);
        expect(payload).not.toBeInstanceOf(Instructor);
        expect(result).toBeInstanceOf(Instructor);
    });

    test('Input object transformed to Instructor object', async () => {
        mockInstructorDao.saveInstructor.mockImplementation(o => o);

        const payload = {
            first_name: 'John',
            last_name: 'Smith',
            department: 'testing'
        };

        const result = await instructorService.saveInstructor(payload);
        expect(payload).not.toBeInstanceOf(Instructor);
        expect(result).toBeInstanceOf(Instructor);
    });
    test('ID value of input is replaced in output', async () => {
        mockInstructorDao.saveInstructor.mockImplementation(o => o);

        const payload = {
            id: 15,
            first_name: 'John',
            last_name: 'Smith',
            department: 'testing'
        };

        const result = await instructorService.saveInstructor(payload);

        expect(result.id).not.toBe(payload.id);
    });

    test('Extraneous fields in input are not in output', async () => {
        mockInstructorDao.saveInstructor.mockImplementation(o => o);

        const payload = {
            first_name: 'John',
            last_name: 'Smith',
            department: 'testing',
            likesSkateboards: true
        };

        const result = await instructorService.saveInstructor(payload) as any;

        expect(result.likesSkateboards).not.toBeDefined();
    });

});

describe('patchInstructor', () => {
    /* Testing behavior of patchInstructor */
    /*
        1. When a valid patch with an id property is provied, patch succeeds
            returning a truthy object.
        2. When a patch with no id property is provided, an error should be thrown.
    */

    test('successful patch', async () => {
        expect.assertions(1);

        mockInstructorDao.patchInstructor
            .mockImplementation(() => ({}));

        const payload = {
            id: 1,
            first_name: 'Abby',
            last_name: 'Adams',
            department: '2020-01-01'
        };

        const result = await instructorService.patchInstructor(payload);
        expect(result).toBeTruthy();
    });

    test('patch fails when no valid id is provided', async () => {
        expect.assertions(1);

        mockInstructorDao.patchInstructor
            .mockImplementation(() => ({}));

        const payload = {
            first_name: 'Abby',
            last_name: 'Adams',
            department: '2020-01-01'
        };

        try {
            await instructorService.patchInstructor(payload);
            fail();
        } catch(err) {
            expect(err).toBeTruthy();
        }
    });
});

