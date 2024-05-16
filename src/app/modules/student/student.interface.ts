export interface IGuardian{
    fatherName: string;
    fatherOccupation: string;
    motherName: string;
    motherOccupation: string;
}

export interface IStudent {
    id: string;
    name: {
        firstName: string;
        lastName: string;
    },
    email: string;
    dateOfBirth: Date;
    address: string;
    contactNo: string;
    bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
    guardian: IGuardian;
    isActive: boolean;
}