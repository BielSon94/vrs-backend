import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { UserI } from "src/users/interfaces/user.interface";
import { ReservationStatus } from "../enums/reservation-status.enum";

export class CreateReservationDto {

    //@IsNumber()
    //@IsNotEmpty()
    userId: number;

    @IsString()
    from: string;

    @IsString()
    to: string;

    //@IsDateString()
    //reservationDate: Date;

    @IsOptional()
    @IsEnum(ReservationStatus)
    status: ReservationStatus;

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
