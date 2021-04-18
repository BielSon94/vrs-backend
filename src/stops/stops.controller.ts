import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CreateStopDto } from './dto/create-stop.dto';
import { StopResponse } from './interfaces/stop-response.model';
import { StopsService } from './stops.service';

@Controller('stops')
export class StopsController {

    constructor(
        @Inject(StopsService) private stopsService: StopsService
    ) {}

    @Get(':id')
    getStop(id: number) {
        return this.stopsService.getStop(id);
    }

    @Get()
    getStops() {
        return this.stopsService.getStops();
    }

    @Post()
    createStop(@Body() dto: CreateStopDto): Promise<any> {
        return this.stopsService.createStop(dto);
    }
}
