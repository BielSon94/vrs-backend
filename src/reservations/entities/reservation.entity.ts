import { Route } from "src/routes/entities/route.entity";
import { User } from "src/users/entities/user.entity";
import { UserI } from "src/users/interfaces/user.interface";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ReservationStatus } from "../enums/reservation-status.enum";
import { ReservationI } from "../interfaces/reservation.model";
import { Route as RouteI } from "../../routes/interfaces/route.model";

@Entity('reservation')
export class Reservation{

    @PrimaryGeneratedColumn("uuid")
    id: string;

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

    @ManyToOne(()=> User, user => user.reservations, { onDelete: "CASCADE"})
    @JoinTable()
    user: UserI;

    @ManyToOne(() => Route, route => route.reservations, { onDelete: 'CASCADE'})
    @JoinTable()
    route: RouteI;
}