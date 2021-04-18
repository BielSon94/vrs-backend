import { User } from "src/users/entities/user.entity";
import { UserI } from "src/users/interfaces/user.interface";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ReservationStatus } from "../enums/reservation-status.enum";
import { ReservationI } from "../interfaces/reservation.model";

@Entity('reservation')
export class Reservation implements ReservationI{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    from: string;

    @Column()
    to: string;

    @Column({
        type: "enum",
        enum: ReservationStatus,
        default: ReservationStatus.NEW
    })
    status: ReservationStatus;

    @CreateDateColumn({
        name: "created_at",
        type: "timestamp"
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: "updated_at",
        type: "timestamp"
    })
    updatedAt: Date;

    @ManyToOne(type=> User, user => user.reservations, { onDelete: "CASCADE"})
    @JoinColumn()
    user: UserI;
}