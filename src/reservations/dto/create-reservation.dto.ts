import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Stop } from "src/stops/interfaces/stop.model";
import { UserI } from "src/users/interfaces/user.interface";
import { ReservationStatus } from "../enums/reservation-status.enum";

export class CreateReservationDto {

    //@IsNumber()
    //@IsNotEmpty()
    userId: number;

    //@IsDateString()
    //reservationDate: Date;

    @IsOptional()
    @IsEnum(ReservationStatus)
    status: ReservationStatus;

    @IsOptional()
    routeId: number;
}



// status rezerwacji

/*
    NOWA
    POTWIERDZONA
    ANULOWANA
    ODRZUCONA // np za malo miejsc
    ZREALIZOWANA
    ZAMKNIĘTA
*/
