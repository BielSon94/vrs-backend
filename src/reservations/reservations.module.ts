// Moduł rezerwacji miejsca
/*

NUMER REZERWACJI (UNIKALNA)
DO KOGO PRZYPISANA (USER)
DO JAKIEJ TRASY (ROUTES)
DATA ODJAZDU
DATA PRZYJAZDU

*/

import { forwardRef, Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { UsersModule } from 'src/users/users.module';
import { RoutesModule } from 'src/routes/routes.module';
import { RoutesService } from 'src/routes/routes.service';
import { Route } from 'src/routes/entities/route.entity';
import { StopsService } from 'src/stops/stops.service';
import { StopsModule } from 'src/stops/stops.module';
import { Stop } from 'src/stops/entities/stop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Route, Stop]), UsersModule, RoutesModule, StopsModule],
  providers: [ReservationsService, RoutesService, StopsService],
  controllers: [ReservationsController]
})
export class ReservationsModule {}
