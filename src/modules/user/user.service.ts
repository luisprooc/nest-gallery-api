import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../database/entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private  _userRepository: UserRepository){}

  async getAll(): Promise<any[]>{
    try {
      const users: User[] = await this._userRepository.find();
      return users;
    }
    catch(error){
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number): Promise<any>{
    try {
      const user: User = await this._userRepository.findOne(id);
      return user;
    }
    catch(error){
      throw new BadRequestException(error);
    }
  }

  async create(user: User): Promise<any>{
    try {
      const createdUser = await this._userRepository.save(user);
      return createdUser;
    }
    catch(error){
      throw new BadRequestException(error);
    }
  }

  async delete(id: number): Promise<string>{
    try {
      await this._userRepository.delete(id);
      return `The user with ${id} ID has been deleted`;
    }
    catch(error){
      throw new BadRequestException(error);
    }
    
  }

  async update(id: number, user: User): Promise<any>{
    try {
      const updateUser = await this._userRepository.update(id, user);
      return updateUser;
    }
    catch(error){
      throw new BadRequestException(error);
    }
  }
}