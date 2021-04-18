import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { GetReservationsResponse, ReservationI } from './interfaces/reservation.model';
import { EditReservationDto } from './dto/edit-reservation.dto';
import { UserI } from 'src/users/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { error } from 'node:console';

@Injectable()
export class ReservationsService {

    constructor(
        @InjectRepository(Reservation) private reservationRepository: Repository<Reservation>,
        @Inject(UsersService) private readonly userService: UsersService
    ) {}

    async createReservation(dto: CreateReservationDto): Promise<any> {

        const newReservation = new Reservation();

        newReservation.from = dto.from;
        newReservation.to = dto.to;
        newReservation.status = dto.status;

        const reservation = await this.reservationRepository.save(newReservation);

        const user = await this.userService.getOneUser(dto.userId);

        newReservation.user = user;

        await this.reservationRepository.save(newReservation);

        return {
            message: "Reservacja stworzona pomyślnie",
            reservation
        }

        /*const { userId, from, to, status} = dto;

        await this.userService.getOneUser(userId);

            const newReservation = await this.reservationRepository.create(dto);
            const reservation = await this.reservationRepository.save(newReservation);
            return {
                message: "Reservacja stworzona pomyślnie",
                reservation
            }*/
    }

    async getAllReservations(): Promise<GetReservationsResponse> {
        const reservations = await this.reservationRepository.find({ relations: ['user']});

        if(reservations.length < 1){
            return {
                message: "Aktualnie brak rezerwacji"
            }
        } else {
            return {
                message: "Pobrano pomyślnie",
                reservations
            }
        }
    }

    async getOneReservation(id: string) {
        const reservation = await this.reservationRepository.findOne({id}, {relations: ['user']},);

        if (!reservation) throw new NotFoundException(`Nie znaleziono rezerwacji o podanym numerze id: ${id}.`)

        return reservation;
    }

    async updateReservation(id: string, dto: EditReservationDto) {
        const reservation = await this.reservationRepository.findOne(id);

        if(!reservation) throw new NotFoundException(`Rezerwacja o podanym numerze id ${id} nie istnieje.`)

        const user = await this.userService.getOneUser(dto.userId);

        const editedReservation = Object.assign(reservation, dto);
        editedReservation.user = user;
        return await this.reservationRepository.save(editedReservation);
    }

    async removeReservation(id: string): Promise<any> {
        const reservation = await this.reservationRepository.findOne(id);

        if (reservation){
            await this.reservationRepository.remove(reservation);

            return {
                message: `Rezerwacja o numerze ${id} została usunięta pomyśnie`
            }
        }

        return {
            message: `Rezerwacja o numerze ${id} nie istnieje.`
        }
    }





}
