// Moduł rezerwacji miejsca
/*

NUMER REZERWACJI (UNIKALNA)
DO KOGO PRZYPISANA (USER)
DO JAKIEJ TRASY (ROUTES)
DATA ODJAZDU
DATA PRZYJAZDU

*/

import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation]), UsersModule],
  providers: [ReservationsService],
  controllers: [ReservationsController]
})
export class ReservationsModule {}
