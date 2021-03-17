import { IsBoolean, IsDate, IsDateString, IsEmail, IsEnum, IsLowercase, IsOptional, IsString, Length, MaxLength } from "class-validator";
import { UserRole } from "../enums/user-role.enum";

export class CreateUserDto {

    @IsString()
    @IsEmail()
    //@IsLowercase()
    email: string;

    @IsString()
    @Length(6, 20)
    password: string;

    @IsString()
    @MaxLength(20)
    firstName: string;

    @IsString()
    @MaxLength(30)
    lastName: string;

    @IsDateString()
    birthDate: Date;

    @IsBoolean()
    @IsOptional()
    isEmployee: boolean;

    @IsEnum(UserRole)
    @IsOptional()
    role: UserRole;

}