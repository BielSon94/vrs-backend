import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRouteDto } from './dto/create-route.dto';
import { Route } from './entities/route.entity';
import { Stop as StopI } from 'src/stops/interfaces/stop.model';
import { Stop } from 'src/stops/entities/stop.entity';
import { StopsService } from 'src/stops/stops.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { from, Observable } from 'rxjs';
import { EditRouteDto } from './dto/edit-route.dto';

@Injectable()
export class RoutesService {

    constructor(
        @InjectRepository(Route) private routeRepository: Repository<Route>,
        @Inject(StopsService) private stopsService: StopsService,
        @Inject(UsersService) private usersService: UsersService
    ) {}

    async getAllRoutes() {
        return await this.routeRepository.find(
            {
                relations: ['start','end', 'driver']
            }
        );
    }

    async getRoute(id: number) {
        return await this.routeRepository.findOne(id)
    }

    async createRoute(dto: CreateRouteDto): Promise<any> {

        const newRoute = new Route();
        newRoute.arrival_date = dto.arrival_date;

        const start: Stop = await this.stopsService.getStop(dto.startId);
        const end: Stop = await this.stopsService.getStop(dto.endId);
        const driver: User = await this.usersService.getDriver(dto.driverId);;

        newRoute.start = start;
        newRoute.end = end;
        newRoute.driver = driver;

        await this.routeRepository.save(newRoute);

        return {
            message: "Trasa stworzonna pomyślnie",
            newRoute
            //newRoute
        }

    }

    async updateOne(id: number, route: EditRouteDto) {

        if(route.driverId != null) {
            const driver = await this.usersService.getDriver(route.driverId);
            route.driver = driver;
        }

        if(route.startId != null) {
            const start = await this.stopsService.getStop(route.startId);
            route.start = start;
        }

        if(route.endId != null) {
            const end = await this.stopsService.getStop(route.endId);
            route.end = end;
        }

            delete route.driverId;
            delete route.endId;
            delete route.startId;

            const updateRoute = await this.routeRepository.update(id, route);

            return {
                updateRoute
            }

    }


    deleteOne(id: number): Observable<any> {
        return from(this.routeRepository.delete(id));
    }

}
