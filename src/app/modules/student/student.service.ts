import { IStudent } from './student.interface';
import Student from './student.model';

const saveStudentToDB = async (student: IStudent) => {
  return await Student.create(student);
};

const fetchedStudentsToDB = async () => {
  return await Student.find();
};

const fetchedSingleStudentToDB = async (id: string) => {
  return await Student.findOne({ id });
};

export const studentService = {
  saveStudentToDB,
  fetchedStudentsToDB,
  fetchedSingleStudentToDB,
};
