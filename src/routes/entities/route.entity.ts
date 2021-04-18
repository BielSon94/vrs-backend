import { Stop } from "src/stops/entities/stop.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('route')
export class Route {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Stop, (stop: Stop) => stop.firstStop)
    @JoinColumn()
    start: Stop;

    @OneToOne(() => Stop, (stop: Stop) => stop.lastStop)
    @JoinColumn()
    end: Stop;

    @Column()
    arrival_date: Date;

    @ManyToMany(() => Stop, (stop: Stop) => stop.route)
    @JoinTable()
    stops: Stop[];

}