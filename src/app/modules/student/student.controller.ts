import { Request, Response } from 'express';
import { ApiError, ApiResponse, asyncHandler } from '../../../utils';
import { studentService } from './student.service';
import { studentValidationSchema } from './student.validator';

const createStudent = asyncHandler(async (req: Request, res: Response) => {
  const { student } = req.body;

  // const validationStudent = studentValidationSchema.parse(student);

  const { data, error } = studentValidationSchema.safeParse(student);

  if (error) {
    throw new ApiError(
      400,
      error.issues[0].message,
      error.issues,
    );
  }

  const result = await studentService.saveStudentToDB(data);
  return res
    .status(201)
    .json(new ApiResponse(201, result, 'Student created successfully'));
});

const fetchedStudents = asyncHandler(async (req: Request, res: Response) => {
  const result = await studentService.fetchedStudentsToDB();

  if (!result) {
    throw new ApiError(404, 'Student not found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, result, 'Students retrieved successfully'));
});

const fetchedSingleStudent = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await studentService.fetchedSingleStudentToDB(id);

    if (!result) {
      throw new ApiError(404, 'Student not found');
    }

    return res
      .status(200)
      .json(new ApiResponse(200, result, 'Student retrieved successfully'));
  },
);

const deleteStudent = asyncHandler(async (req: Request, res: Response) => {
  const result = await studentService.deleteStudentFromDB(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, result, 'Student deleted successfully'));
});

export const studentController = {
  createStudent,
  fetchedStudents,
  fetchedSingleStudent,
  deleteStudent,
};
