import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { async } from 'rxjs';
import { User } from 'src/decorators/user.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User as UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { LocalAuthGuard } from './guards/local-auth-guard';

@Controller('auth')
export class AuthController {

    constructor(
        @Inject(AuthService) private authService: AuthService,
        @Inject(UsersService) private usersService: UsersService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() loginDto: AuthLoginDto, @User() user: UserEntity) {
      const data = await this.authService.login(user);
      return {
        success: true,
        message: "Zalogowano pomyślnie",
        data
      };
    }

    /*@Post('login')
    async login(@Body() dto: AuthLoginDto, @User() user: UserEntity): Promise<any> {
        const data = await this.authService.login(dto);
        return {
            success: true,
            message: "Zalogowano pomyślnie",
            data,
            user
        }
    }*/

    @Post('register')
    register(@Body() dto: CreateUserDto) {
        this.usersService.createOne(dto);
    }
}
