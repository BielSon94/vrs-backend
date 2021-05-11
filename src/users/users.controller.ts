import { Body, Controller, Delete, ForbiddenException, Get, HttpStatus, Inject, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { ValidationError } from 'class-validator';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { UserI } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        @Inject(UsersService) private usersService: UsersService
    ) {}

    @Post()
    async addUser(@Body() dto: CreateUserDto): Promise<any> {
        const user = await this.usersService.createOne(dto);
        return {
            message: "Użytkownik stworzony pomyślnie",
            user
        }
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    getUsers(): Promise<UserI[]> {
        return this.usersService.getAllUsers();
    }

    @Get('/driver')
    getDriver() {
        const driver = this.usersService.findDriver();
        return driver
    }

    @Get(':id')
    //@UseGuards(JwtAuthGuard)
    getUser(
        @Param('id', new ParseIntPipe({
            errorHttpStatusCode: HttpStatus.FORBIDDEN,
        })) id: number): Promise<UserI> {
        return this.usersService.getOneUser(id);
    }

    @Patch(':id')
    updateOne(
        @Param('id') id: number,
        @Body() editUser: EditUserDto) {
        const data = this.usersService.updateOne(id, editUser);
        const user = this.usersService.getOneUser(id);
        return {
            message: "Użytkownik edytowany pomyślnie",
            user
        }
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    removeUser(
        @Param('id') id: number): Observable<any> {
            return this.usersService.deleteOne(id);
    }


}
