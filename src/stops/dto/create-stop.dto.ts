import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";
import { Route } from "src/routes/interfaces/route.model";

export class CreateStopDto {

    //id: number;

    @IsString()
    name: string;

    @IsNumber()
    @IsOptional()
    lat: number | null;

    @IsOptional()
    @IsNumber()
    lng: number | null;

    //@IsOptional()
    //route: Route | null;

}
