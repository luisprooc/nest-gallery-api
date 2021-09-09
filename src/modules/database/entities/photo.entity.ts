import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Photo extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', nullable: false})
  url: string;

  @Column({type: 'varchar', nullable: true, length: 100})
  text: string;

  @ManyToOne(() => User, user => user.photos)
  user: User;

}