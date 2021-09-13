import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/database/entities/user.entity';
export class PhotoDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly url: string;

  @ApiProperty()
  readonly text?: string;

  @ApiProperty()
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