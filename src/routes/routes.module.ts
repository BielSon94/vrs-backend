import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StopsModule } from 'src/stops/stops.module';
import { StopsService } from 'src/stops/stops.service';
import { Route } from './entities/route.entity';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Route]), StopsModule],
  controllers: [RoutesController],
  providers: [RoutesService]
})
export class RoutesModule {}
