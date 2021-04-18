import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRouteDto } from './dto/create-route.dto';
import { Route } from './entities/route.entity';
import { Stop as StopI } from 'src/stops/interfaces/stop.model';
import { Stop } from 'src/stops/entities/stop.entity';

@Injectable()
export class RoutesService {

    constructor(
        @InjectRepository(Route) private routeRepository: Repository<Route>,

        //@InjectRepository(Stop) private readonly stopRepository: Repository<Stop>,
        //@Inject(StopsService) private stopsService: StopsService
    ) {}

    async getAllRoutes() {
        return await this.routeRepository.find(
            {
                relations: ['start','end','stops']
            }
        );
    }

    async createRoute(dto: CreateRouteDto): Promise<any> {

        //const {stopsId} = dto;

        //const stops = await this.stopsService.getStop(stopsId);

        //const newRoute = new Route();
        //newRoute.id = dto.id;
        //newRoute.start = dto.start;
        //newRoute.end = dto.end;
        //newRoute.arrival_date = dto.arrival_date;

        //await this.routeRepository.save(newRoute);

        //newRoute.stops = dto.stopsId;

        //await this.routeRepository.save(newRoute);



        /*const newRoute = new Route();

        newRoute.id = dto.id;
        newRoute.start = dto.start;
        newRoute.end = dto.end;
        newRoute.arrival_date = dto.arrival_date;
        //newRoute.stops = stop;

        await this.routeRepository.save(newRoute);

        const newStop = new Stop();
        newStop.id = stop.id;

        newRoute.stops = ;
        */
        //await this.routeRepository.save(newRoute);

        return {
            message: "Trasa stworzonna pomyślnie",
            //newRoute
        }
    }
}
