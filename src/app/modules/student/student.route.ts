import { Router } from 'express';
import { studentController } from './student.controller';

const router = Router();

router.route('/create-student').post(studentController.createStudent);

router.route('/').get(studentController.fetchedStudents);

router.route('/:id').get(studentController.fetchedSingleStudent);

export const studentRoute = router;
