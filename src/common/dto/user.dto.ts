import { ApiProperty } from '@nestjs/swagger';
export class UserDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly fullName: string;

  @ApiProperty()
  readonly isActive?: boolean = true;

  @ApiProperty()
  readonly description: string;

  constructor(
    id: number,
    fullName: string,
    isActive: boolean,
    description: string
  ){
    this.id = id;
    this.fullName = fullName,
    this.isActive = isActive,
    this.description = description
  }
}