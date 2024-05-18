import { Model } from 'mongoose';
import { z } from 'zod';
import {
  guardianValidationSchema,
  studentValidationSchema,
} from './student.validator';

// export interface IGuardian extends Document {
//   fatherName: string;
//   fatherOccupation: string;
//   motherName: string;
//   motherOccupation: string;
// }

// export interface IStudent extends Document {
//   id: string;
//   name: {
//     firstName: string;
//     lastName: string;
//   };
//   email: string;
//   dateOfBirth: Date;
//   address: string;
//   contactNo: string;
//   bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
//   guardian: IGuardian;
//   isActive: boolean;
// }

// export type IGuardian = z.infer<typeof guardianValidationSchema>;
// export type IStudent = z.infer<typeof studentValidationSchema>;

export interface IGuardian extends z.infer<typeof guardianValidationSchema> {}
export interface IStudent extends z.infer<typeof studentValidationSchema> {}

// export type IStudentMethods = {
//   // eslint-disable-next-line no-unused-vars
//   isUserExists: (id: string) => Promise<IStudent | null>;
// };

// export interface IStudentMethods {
//   // eslint-disable-next-line no-unused-vars
//   isUserExists(id: string): Promise<IStudent | null>;
// }

// export type IStudentModel = Model<
//   IStudent,
//   Record<string, never>,
//   IStudentMethods
// >;

export interface IStudentModel extends Model<IStudent> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<IStudent | null>;
}
