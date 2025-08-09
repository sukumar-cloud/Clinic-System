import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  specialization: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  location: string;

  @Column({ default: true })
  available: boolean;
}
