import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { User } from 'src/modules/database/entities/user.entity';
import {UserDto } from 'src/common/dto/user.dto'
import { UserService } from 'src/modules/user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService){}

  @Get()
  findAll(): Promise<UserDto[]> {
    return this._userService.getAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return this._userService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this._userService.delete(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateUser: User
  ): Promise<any> {
    return this._userService.update(id,updateUser);
  }

  @Post()
  create(@Body() createUser: User): Promise<UserDto> {
    return this._userService.create(createUser);
  }

}
