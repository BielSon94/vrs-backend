import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UserI } from 'src/users/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {

    constructor(
        @Inject(UsersService) private userService: UsersService,
        @Inject(JwtService) private jwtService: JwtService
    ) {}

    /*async login(dto: AuthLoginDto): Promise<any> {

        const user = await this.userService.findOne({email});

        const accessToken = this.jwtService.sign(payload)

        return {
            success: true,
            message: "Zalogowano pomyślnie",
            user,
            accessToken
        }
    }*/

    login(user: User) {
        const { id, ...rest } = user;
        const payload = { email: user.email, sub: id }
        //const payload = { sub: id };

        return {
          user,
          accessToken: this.jwtService.sign(payload),
        };
      }

    async register(dto: CreateUserDto): Promise<any> {


    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findOne({ email });

        if (user && (await compare(password, user.password))) {
          const { password, ...rest } = user;

          return rest;

        }

        return null;

      }

    /*async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findOne(email);

        if (user && (await compare(password, user.password))) {
            const { password, ...rest } = user;
            return rest;
        }

        return null;
    }*/
}
