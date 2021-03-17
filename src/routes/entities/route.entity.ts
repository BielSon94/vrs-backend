import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('route')
export class Route {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    start: string;  // PUNKT STAROTWY

    @Column()
    end: string     // PUNKT DOCELOWY

    @Column()
    arrival_date: Date; // Data podróży

    // TO POŁĄCZYĆ Z REZERWACJĄ

}