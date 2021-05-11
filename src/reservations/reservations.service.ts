import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
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
import { RoutesService } from 'src/routes/routes.service';
import { Route as RouteI} from '../routes/interfaces/route.model';
import { GetTicketResponse } from './interfaces/ticket.model';

@Injectable()
export class ReservationsService {

    constructor(
        @InjectRepository(Reservation) private reservationRepository: Repository<Reservation>,
        @Inject(UsersService) private readonly userService: UsersService,
        @Inject(forwardRef(() => RoutesService)) private readonly routeService: RoutesService
    ) {}

    async createReservation(dto: CreateReservationDto): Promise<any> {

        const newReservation = new Reservation();

        //newReservation.from = dto.from;
        //newReservation.to = dto.to;
        newReservation.status = dto.status;

        const reservation = await this.reservationRepository.save(newReservation);

        const user = await this.userService.getOneUser(dto.userId);

        newReservation.user = user;

        await this.reservationRepository.save(newReservation);

        const route = await this.routeService.getRoute(dto.routeId);

        newReservation.route = route;

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

    async createUserReservation(): Promise<any> {


    }

    async getAllReservations(): Promise<GetReservationsResponse> {
        const reservations = await this.reservationRepository.find({ relations: ['user', 'route', 'route.start', 'route.end']});

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

    async getUserTicket(id: number): Promise<GetTicketResponse> {
        const userId = await this.userService.getOne(id);
        console.log(userId);
        const ticket = await this.reservationRepository.find({relations: ['user', 'route', 'route.start', 'route.end'], where: {user: userId}});

        if(!ticket) {
            return {
                message: "Nie udało sie pobrać rezerwacji"
            }
        }

        return {
            message: "",
            ticket
        }
    }

    async getOneReservation(id: string) {
        const reservation = await this.reservationRepository.findOne({id}, {relations: ['user', 'route']},);

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
