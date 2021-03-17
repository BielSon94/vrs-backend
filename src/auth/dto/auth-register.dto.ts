import { IsEmail, IsString } from "class-validator";
import { AuthLoginDto } from "./auth-login.dto";

export class AuthRegisterDto extends AuthLoginDto {

    @IsEmail()
    @IsString()
    fistName: string;

    @IsString()
    lastName: string;
}