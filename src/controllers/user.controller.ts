import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { User } from 'src/modules/database/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService){}

  @Get()
  findAll(): Promise<any[]> {
    return this._userService.getAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this._userService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this._userService.delete(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateUser: User
  ) {
    return this._userService.update(id,updateUser);
  }

  @Post()
  create(@Body() createUser: User) {
    return this._userService.create(createUser);
  }

}
