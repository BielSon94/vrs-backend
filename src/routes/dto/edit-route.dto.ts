import { IsArray, IsDateString, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { Stop } from "src/stops/interfaces/stop.model";
import { UserI } from "src/users/interfaces/user.interface";

export class EditRouteDto {

    @IsOptional()
    start: Stop; //punkt startowy numer przystanku

    @IsOptional()
    startId: number;

    @IsOptional()
    endId: number;

    @IsOptional()
    end: Stop; // PUNKT DOCELOWY numer przystanku

    @IsOptional()
    driver: UserI;

    @IsOptional()
    driverId: number;

    @IsDateString()
    @IsOptional()
    arrival_date: Date; // Data podróży
}