import { Reservation } from "src/reservations/entities/reservation.entity";
import { ReservationI } from "src/reservations/interfaces/reservation.model";
import { Stop } from "src/stops/entities/stop.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('route')
export class Route {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Stop, (stop: Stop) => stop.firstStop, {
        onDelete: 'CASCADE'
    })
    @JoinColumn()
    start: Stop;

    @ManyToOne(() => Stop, (stop: Stop) => stop.lastStop, {
        onDelete: 'CASCADE'
    })
    @JoinColumn()
    end: Stop;

    @Column()
    arrival_date: Date;

    @ManyToOne(() => User, (driver: User) => driver.route, {
        onDelete: 'SET NULL'
    })
    @JoinTable()
    driver: User;

    @OneToMany(() => Reservation, (reservation: Reservation) => reservation.route, {
        onDelete: 'CASCADE'
    })
    @JoinTable()
    reservations: ReservationI;
}