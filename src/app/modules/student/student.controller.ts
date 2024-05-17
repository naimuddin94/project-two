import { Request, Response } from 'express';
import { ApiError, ApiResponse, asyncHandler } from '../../../utils';
import { studentService } from './student.service';

const createStudent = asyncHandler(async (req: Request, res: Response) => {
  const { student } = req.body;
  const result = await studentService.saveStudentToDB(student);
  res
    .status(200)
    .json(new ApiResponse(200, result, 'Student created successfully'));
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

export const studentController = {
  createStudent,
  fetchedStudents,
  fetchedSingleStudent,
};
