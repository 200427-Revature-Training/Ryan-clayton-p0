import * as studentService from '../../src/services/student-services';
import * as studentDao from '../../src/daos/student-dao';
import {Student} from '../../src/models/student'

jest.mock('../../src/daos/student-dao')

const mockStudentDao = studentDao as any;

describe('saveStudent', () => {
    test('422 returned if no first_name provided', async () => {
        // peopleDao.saveStudent will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockStudentDao.saveStudent.mockImplementation(() => {
        });

        const payload = {
            last_name: 'Smith',
            major: 'Testing'
        }

        try {
            // This async function should reject due to missing first_name
            await studentService.saveStudent(payload);
            fail('studentService.saveStudent did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });
    test('422 returned if no last_name provided', async () => {
        // peopleDao.saveStudent will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockStudentDao.saveStudent.mockImplementation(() => {
        });

        const payload = {
            first_name: 'Smith',
            major: 'Testing'
        }

        try {
            // This async function should reject due to missing first_name
            await studentService.saveStudent(payload);
            fail('studentService.saveStudent did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });
    test('Students are allowed empty major Input object transformed to Student object', async () => {
        // peopleDao.saveStudent will return undefined rather than execute
        // Stubbing - Replacing a method with a fake method implementation
        mockStudentDao.saveStudent.mockImplementation(o => o);


        const payload = {
            last_name: 'Smith',
            first_name: 'John'
        }

        const result = await studentService.saveStudent(payload);
        expect(payload).not.toBeInstanceOf(Student);
        expect(result).toBeInstanceOf(Student);
    });

    test('Input object transformed to Student object', async () => {
        mockStudentDao.saveStudent.mockImplementation(o => o);

        const payload = {
            first_name: 'John',
            last_name: 'Smith',
            major: 'testing'
        };

        const result = await studentService.saveStudent(payload);
        expect(payload).not.toBeInstanceOf(Student);
        expect(result).toBeInstanceOf(Student);
    });
    test('ID value of input is replaced in output', async () => {
        mockStudentDao.saveStudent.mockImplementation(o => o);

        const payload = {
            id: 15,
            first_name: 'John',
            last_name: 'Smith',
            major: 'testing'
        };

        const result = await studentService.saveStudent(payload);

        expect(result.id).not.toBe(payload.id);
    });

    test('Extraneous fields in input are not in output', async () => {
        mockStudentDao.saveStudent.mockImplementation(o => o);

        const payload = {
            first_name: 'John',
            last_name: 'Smith',
            major: 'testing',
            likesSkateboards: true
        };

        const result = await studentService.saveStudent(payload) as any;

        expect(result.likesSkateboards).not.toBeDefined();
    });

});

describe('patchStudent', () => {
    /* Testing behavior of patchStudent */
    /*
        1. When a valid patch with an id property is provied, patch succeeds
            returning a truthy object.
        2. When a patch with no id property is provided, an error should be thrown.
    */

    test('successful patch', async () => {
        expect.assertions(1);

        mockStudentDao.patchStudent
            .mockImplementation(() => ({}));

        const payload = {
            id: 1,
            first_name: 'Abby',
            last_name: 'Adams',
            major: '2020-01-01'
        };

        const result = await studentService.patchStudent(payload);
        expect(result).toBeTruthy();
    });

    test('patch fails when no valid id is provided', async () => {
        expect.assertions(1);

        mockStudentDao.patchStudent
            .mockImplementation(() => ({}));

        const payload = {
            first_name: 'Abby',
            last_name: 'Adams',
            major: '2020-01-01'
        };

        try {
            await studentService.patchStudent(payload);
            fail();
        } catch(err) {
            expect(err).toBeTruthy();
        }
    });
});

