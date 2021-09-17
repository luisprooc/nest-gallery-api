import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards, Req } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import {UserDto } from 'src/common/dto/user/user.dto'
import { LoginUserDto } from 'src/common/dto/user/login-user.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt.auth.guard';
import { UserService } from 'src/modules/user/user.service';
@Controller('users')
@UseGuards(ThrottlerGuard)
export class UserController {
  constructor(private readonly _userService: UserService){}
  
  
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<UserDto[]> {
    return this._userService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return this._userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this._userService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateUser: UserDto
  ): Promise<any> {
    return this._userService.update(id,updateUser);
  }

  @Post()
  create(@Body() createUser: UserDto): Promise<UserDto> {
    return this._userService.create(createUser);
  }

  @Post('/login')
  login(@Body() loginData: LoginUserDto): Promise<any> {
    return this._userService.login(loginData);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  setStatus(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return this._userService.setStatus(id);
  }

}