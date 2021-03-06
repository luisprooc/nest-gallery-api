import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import { Photo } from './photo.entity'

@Entity()
export class User extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', nullable: false, length: 50})
  fullName: string;

  @Column({type: 'varchar', nullable: false, length: 25})
  username: string;

  @Column({type: 'varchar', nullable: false})
  password: string;

  @Column({type: 'bool', nullable: false, default: true})
  isActive: boolean;

  @Column({type: 'varchar', nullable: true, length: 300})
  description: string;

  @OneToMany(() => Photo, photo => photo.user)
  photos: Photo[];

  constructor(
    id: number,
    fullName: string,
    username: string,
    isActive: boolean,
    description: string
  ){
    super()
    this.id = id;
    this.fullName = fullName,
    this.username = username,
    this.isActive = isActive,
    this.description = description
  }
}