import { IsOptional } from "class-validator";
import { CreateReservationDto } from "./create-reservation.dto";

export class EditReservationDto extends CreateReservationDto {

    @IsOptional()
    from: string;

    @IsOptional()
    to: string;

    @IsOptional()
    reservationDate: Date;

}