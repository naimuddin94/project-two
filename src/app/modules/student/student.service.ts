import { IStudent } from './student.interface';
import Student from './student.model';

export const saveStudentToDB = async (student: IStudent) => {
  const result = await Student.create(student);
  return result;
};
