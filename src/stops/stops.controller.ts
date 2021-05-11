import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { CreateStopDto } from './dto/create-stop.dto';
import { EditStopDto } from './dto/edit-stop.dto';
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

    @Patch(':id')
    updateStop(
        @Param('id') id: number,
        @Body() stop: EditStopDto): Promise<any> {
        return this.stopsService.editStop(id, stop);
    }

    @Delete(':id')
    removeStop(@Param('id') id: number): Promise<any> {
        return this.stopsService.deleteStop(id);
    }
}
