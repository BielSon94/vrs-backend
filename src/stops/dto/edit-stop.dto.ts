import { IsOptional } from "class-validator";
import { CreateStopDto } from "./create-stop.dto";

export class EditStopDto extends CreateStopDto {

    //id: number;
    @IsOptional()
    name: string;

}
