import { Controller, Get } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService){}

  @Get()
  findAll(): Promise<any[]> {
    return this._userService.getAll();
  }
}