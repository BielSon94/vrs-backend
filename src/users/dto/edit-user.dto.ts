import { IsBoolean, IsDate, IsEmail, IsEnum, IsLowercase, IsOptional, IsString, Length, MaxLength } from "class-validator";
import { UserRole } from "../enums/user-role.enum";
import { CreateUserDto } from "./create-user.dto";

export class EditUserDto extends CreateUserDto{

    @IsOptional()
    email: string;

    @IsOptional()
    password: string | null;

    @IsOptional()
    firstName: string;

    @IsOptional()
    lastName: string;

    @IsOptional()
    birthDate: Date;

    @IsOptional()
    isEmployee: boolean;

    @IsOptional()
    role: UserRole;

}