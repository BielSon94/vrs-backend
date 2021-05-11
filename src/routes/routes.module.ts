import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stop } from 'src/stops/entities/stop.entity';
import { StopsModule } from 'src/stops/stops.module';
import { StopsService } from 'src/stops/stops.service';
import { UsersModule } from 'src/users/users.module';
import { Connection } from 'typeorm';
import { Route } from './entities/route.entity';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Route]), TypeOrmModule.forFeature([Stop]), StopsModule, UsersModule],
  controllers: [RoutesController],
  providers: [RoutesService, StopsService]
})
export class RoutesModule {}
