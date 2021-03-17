import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { UserI } from 'src/users/interfaces/user.interface';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { EditReservationDto } from './dto/edit-reservation.dto';
import { GetReservationsResponse, ReservationI } from './interfaces/reservation.model';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {

    constructor(
        @Inject(ReservationsService) private reservationService: ReservationsService
    ) {}

    @Post()
    createReservation(@Body() dto: CreateReservationDto): Promise<any> {
        return this.reservationService.createReservation(dto);
    }

    @Get('/')
    @UseGuards(JwtAuthGuard)
    getAll(): Promise<GetReservationsResponse> {
        return this.reservationService.getAllReservations();
    }

    @Get(':id')
    getOne(
        @Param('id', new ParseUUIDPipe({errorHttpStatusCode: HttpStatus.FORBIDDEN, version: "4"})) id: string) {
        return this.reservationService.getOneReservation(id);
    }

    @Put(':id')
    editOne(
        @Param('id', new ParseUUIDPipe({errorHttpStatusCode: HttpStatus.FORBIDDEN, version: "4"})) id: string,
        @Body() dto: EditReservationDto) {
        return this.reservationService.updateReservation(id, dto);
    }

    @Delete(':id')
    removeReservation(
        @Param('id', new ParseUUIDPipe({errorHttpStatusCode: HttpStatus.FORBIDDEN, version: "4"})) id: string) {
        return this.reservationService.removeReservation(id);
    }

}