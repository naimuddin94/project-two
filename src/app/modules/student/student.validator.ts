import { z } from 'zod';

export const guardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
});

export const studentValidationSchema = z.object({
  id: z.string(),
  name: z.object({
    firstName: z
      .string()
      .max(20, { message: 'First name is not longer than 20 characters' }),
    lastName: z
      .string()
      .max(20, { message: 'Last name is not longer than 20 characters' }),
  }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string({ message: 'Password is required' })
    .min(6, { message: 'Password is at least 6 characters' })
    .max(20, { message: 'Password is not longer than 20 characters' }),
  dateOfBirth: z.preprocess((arg: unknown) => {
    if (typeof arg === 'string') {
      return new Date(arg);
    }
    return arg;
  }, z.date()),
  address: z.string(),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  contactNo: z
    .string()
    .max(11, { message: 'Please enter a valid mobile number' }),
  guardian: guardianValidationSchema,
  isActive: z.boolean(),
  isDeleted: z.optional(z.boolean()),
});
