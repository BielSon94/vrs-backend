import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from 'src/routes/entities/route.entity';
import { RoutesModule } from 'src/routes/routes.module';
import { RoutesService } from 'src/routes/routes.service';
import { Stop } from 'src/stops/entities/stop.entity';
import { StopsModule } from 'src/stops/stops.module';
import { StopsService } from 'src/stops/stops.service';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [TypeOrmModule.forFeature([Route]), TypeOrmModule.forFeature([Stop]), TypeOrmModule.forFeature([User]), RoutesModule, StopsModule, UsersModule],
  controllers: [SearchController],
  providers: [SearchService, RoutesService, StopsService]
})
export class SearchModule {}
