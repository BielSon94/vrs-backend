import { IsArray, IsDateString, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { Stop } from "src/stops/interfaces/stop.model";

export class CreateRouteDto {

    @IsOptional()
    start: Stop; //punkt startowy numer przystanku

    @IsOptional()
    end: Stop; // PUNKT DOCELOWY numer przystanku

    @IsDateString()
    arrival_date: Date; // Data podróży

    @IsOptional()
    stopsId: Stop[] | number | any//Array<Stop>; // Lista przystanków pomiędzy;
}