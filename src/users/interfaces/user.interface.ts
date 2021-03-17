import { UserRole } from "../enums/user-role.enum";


export interface UserI {

    id: number,
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    isEmployee: boolean;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;

}