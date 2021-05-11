import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Stop } from 'src/stops/interfaces/stop.model';
import { CreateRouteDto } from './dto/create-route.dto';
import { EditRouteDto } from './dto/edit-route.dto';
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

    @Get(':id')
    getOneRoute(id: number) {
        return this.routesService.getRoute(id);
    }

    @Patch(':id')
    async updateOne(
        @Param('id') id: number,
        @Body() dto: EditRouteDto) {
        await this.routesService.updateOne(id, dto);
        const route = await this.routesService.getRoute(id);
        return {
            message: "Użytkownik edytowany pomyślnie",
            route
        }
    }

    @Delete(':id')
    removeRoute(
        @Param('id') id: number): Observable<any> {
            return this.routesService.deleteOne(id);
    }


}
