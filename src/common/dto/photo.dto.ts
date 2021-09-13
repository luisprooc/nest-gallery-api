import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { User } from 'src/modules/database/entities/user.entity';
export class PhotoDto {
  @ApiProperty()
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  @IsString()
  readonly url: string;

  @ApiProperty()
  @IsString()
  readonly text?: string;

  @ApiProperty()
  @IsNumber()
  readonly user: User;

  constructor(
    id: number,
    url: string,
    text: string,
    user: User
  ){
    this.id = id;
    this.url = url,
    this.text = text,
    this.user = user
  }
}