import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { IGuardian, IStudent, IStudentModel } from './student.interface';

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

const studentSchema = new Schema<IStudent, IStudentModel>({
  id: {
    type: String,
    required: true,
  },
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
    unique: true,
    lowercase: true,
    required: true,
    // validate: function (this: IStudent, value: string) {
    //   const last = this.name.lastName;
    //   console.log({ value, last });
    // },
  },
  password: {
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
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  contactNo: {
    type: String,
    required: true,
  },
  guardian: {
    type: GuardianSchema,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// hooks
studentSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  // this.password = await bcrypt.hash(this.password, 10);
  // next();

  try {
    // Check if the password is modified or this is a new user
    if (!this.isModified('password') || this.isNew) {
      const hashPassword = await bcrypt.hash(
        this.password,
        Number(config.bcrypt_salt),
      );
      this.password = hashPassword;
    }
    next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(error);
  }
});

studentSchema.post('save', function (document, next) {
  document.isDeleted = undefined!;
  document.password = undefined!;
  next();
});

studentSchema.statics.isUserExists = async function (id: string) {
  const result = await Student.findOne({ id });
  return result;
};

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: false });
  next();
});

// studentSchema.methods.isUserExists = function (id: string) {
//   const result = Student.findOne({ id });
//   return result;
// };

const Student = model<IStudent, IStudentModel>('Student', studentSchema);

export default Student;
