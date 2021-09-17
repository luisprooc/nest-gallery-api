import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString, MinLength } from 'class-validator'
export class UserDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsString()
  @MinLength(5)
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsBoolean()
  isActive?: boolean = true;

  @ApiProperty()
  @IsString()
  description: string;


  constructor(
    id: number,
    fullName: string,
    username: string,
    isActive: boolean,
    description: string
  ){
    this.id = id;
    this.fullName = fullName,
    this.username = username,
    this.isActive = isActive,
    this.description = description
  }
}