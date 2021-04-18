import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStopDto } from './dto/create-stop.dto';
import { Stop } from './entities/stop.entity';
import { StopResponse } from './interfaces/stop-response.model';

@Injectable()
export class StopsService {

    constructor(
        @InjectRepository(Stop) private readonly stopRepository: Repository<Stop>
    ) {}

    async getStops() {
        const data = await this.stopRepository.find();
        let message: string;
        if (data != null) {
            message = "Pobrano pomyślnie";
        } else {
            message = "Nie udało się pobrać danych"
        }
        return {
            data,
            message
        }
    }

    async getStop(id: number): Promise<Stop> {
        return await this.stopRepository.findOne(id);
    }

    async createStop(dto: CreateStopDto): Promise<StopResponse | any> {
        const newStop = new Stop();

        newStop.name = dto.name;
        newStop.lat = dto.lat;
        newStop.lng = dto.lng;

        await this.stopRepository.save(newStop);

        return {
            message: "Przystanek stworzony pomyślnie",
            newStop
        }
    }

}
