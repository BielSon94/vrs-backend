import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { Stop } from 'src/stops/interfaces/stop.model';
import { CreateRouteDto } from './dto/create-route.dto';
import { Route } from './entities/route.entity';
import { RoutesService } from './routes.service';

@Controller('routes')
export class RoutesController {

    constructor(
        @Inject(RoutesService) private routesService: RoutesService
    ) {}

    @Get()
    getRoutes(): Promise<any> {
        return this.routesService.getAllRoutes();
    }

    @Post()
    createRoute(@Body() dto: CreateRouteDto): Promise<any> {
        return this.routesService.createRoute(dto);
    }
}
