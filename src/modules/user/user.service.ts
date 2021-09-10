import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDto } from 'src/common/dto/user.dto';
import { User } from '../database/entities/user.entity';
import { UserRepository } from './user.repository';
import { UserMapper } from './user.mapper'

@Injectable()
export class UserService {
  constructor(
    private  _userRepository: UserRepository,
    private _userMapper: UserMapper
  ){}

  async getAll(): Promise<UserDto[]>{
    try {
      const users: User[] = await this._userRepository.find();
      return users.map(user => this._userMapper.entityToDto(user));
    }
    catch(error){
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number): Promise<UserDto>{
    try {
      const user: User = await this._userRepository.findOne(id);
      return this._userMapper.entityToDto(user);
    }
    catch(error){
      throw new BadRequestException(error.message);
    }
  }

  async create(user: User): Promise<UserDto>{
    try {
      const createdUser = await this._userRepository.save(user);
      return this._userMapper.entityToDto(createdUser);
    }
    catch(error){
      throw new BadRequestException(error.message);
    }
  }

  async delete(id: number): Promise<string>{
    try {
      await this._userRepository.delete(id);
      return `The user with ID ${id} has been deleted`;
    }
    catch(error){
      throw new BadRequestException(error.message);
    }
    
  }

  async update(id: number, user: User): Promise<UserDto>{
    try {
      await this._userRepository.update(id, user);
      const updatedUser = this.findOne(id);
      return updatedUser;
    }
    catch(error){
      throw new BadRequestException(error.message);
    }
  }
}