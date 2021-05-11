import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStopDto } from './dto/create-stop.dto';
import { EditStopDto } from './dto/edit-stop.dto';
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
        const stopExist = await this.stopRepository.findOne({ name: dto.name});

        if (stopExist) {
            throw new HttpException("Przystanek o takiej nazwie już istnieje", HttpStatus.CONFLICT);
        }

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

    async editStop(id: number, stop: EditStopDto) {

        const stopExist = await this.stopRepository.findOne({name: stop.name});

        if(stopExist) {
            throw new HttpException("Przystanek o takiej nazwie już istnieje", HttpStatus.CONFLICT);
        } else {
            const newStop = await this.stopRepository.update(id, stop);
            return {
                message: 'Zaktualizowano pomyślnie',
                newStop
            }
        }
    }

    async deleteStop(id: number): Promise<any> {
        await this.stopRepository.delete(id);
        return {
            message: "Usunięto pomyślnie"
        }
    }
}
