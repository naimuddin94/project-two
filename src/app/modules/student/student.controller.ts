import { Request, Response } from 'express';
import { ApiResponse, asyncHandler } from '../../../utils';
import { saveStudentToDB } from './student.service';

export const createStudent = asyncHandler(
  async (req: Request, res: Response) => {
    const student = req.body;
    const result = await saveStudentToDB(student);
    res
      .status(200)
      .json(new ApiResponse(200, result, 'Student created successfully'));
  },
);
