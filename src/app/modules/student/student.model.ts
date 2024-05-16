import { Schema, model } from 'mongoose';
import { IGuardian, IStudent } from './student.interface';

const GuardianSchema = new Schema<IGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
});

const StudentSchema = new Schema<IStudent>({
  name: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  email: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
  },
  contactNo: {
    type: String,
    required: true,
  },
  guardian: GuardianSchema,
  isActive: {
    type: Boolean,
    default: false,
  },
});

const Student = model('Student', StudentSchema);

export default Student;
