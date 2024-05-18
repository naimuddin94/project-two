import { Router } from 'express';
import { studentController } from './student.controller';

const router = Router();

router.route('/create-student').post(studentController.createStudent);

router.route('/').get(studentController.fetchedStudents);

router.route('/:id').get(studentController.fetchedSingleStudent);

router.route('/delete-student/:id').delete(studentController.deleteStudent);

export const studentRoute = router;
