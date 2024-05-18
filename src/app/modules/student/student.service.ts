import { ApiError } from '../../../utils';
import { IStudent } from './student.interface';
import Student from './student.model';

const saveStudentToDB = async (studentData: IStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new ApiError(400, 'Student id already exists');
  }
  const result = await Student.create(studentData);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.findByIdAndUpdate(id, { isDeleted: true });
  return result;
};

const fetchedStudentsToDB = async () => {
  return await Student.find().select('-password -isDeleted');
};

const fetchedSingleStudentToDB = async (id: string) => {
  return await Student.findOne({ id }).select('-password -isDeleted');
};

export const studentService = {
  saveStudentToDB,
  fetchedStudentsToDB,
  fetchedSingleStudentToDB,
  deleteStudentFromDB,
};
