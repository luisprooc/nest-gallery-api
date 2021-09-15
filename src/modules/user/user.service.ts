import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from 'src/common/dto/user.dto';
import { UserRepository } from './user.repository';
import { UserMapper } from './user.mapper';
import { encryptPassword } from 'src/common/encrypt/encryption';

@Injectable()
export class UserService {
  constructor(
    private  _userRepository: UserRepository,
    private _userMapper: UserMapper
  ){}

  async getAll(): Promise<UserDto[]>{
    try {
      const users: UserDto[] = await this._userRepository.find();
      if(!users.length) return [];

      return users.map(user => this._userMapper.dtoToEntity(user));
    }
    catch(error){
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number): Promise<UserDto>{
    try {
      const user: UserDto = await this._userRepository.findOne(id);
      if(!user) throw new NotFoundException('User not found');

      return this._userMapper.dtoToEntity(user);
    }
    catch(error){
      throw new BadRequestException(error.message);
    }
  }

  async create(user: UserDto): Promise<UserDto>{
    try {
      const userExist = await this._userRepository.findOne({username: user.username});
      if(userExist) throw new BadRequestException(`This username is already taken`);

      user['password'] = encryptPassword(user.password);

      const createdUser = await this._userRepository.save(user);
      return this._userMapper.entityToDto(createdUser);
    }
    catch(error){
      throw new BadRequestException(error.message);
    }
  }

  async delete(id: number): Promise<string>{
    try {
      await this.findOne(id);
      await this._userRepository.delete(id);
      return `The user with ID ${id} has been deleted`;
    }
    catch(error){
      throw new BadRequestException(error.message);
    }
    
  }

  async update(id: number, user: UserDto): Promise<UserDto>{
    try {
      await this._userRepository.update(id, user);
      const updatedUser = this.findOne(id);
      return updatedUser;
    }
    catch(error){
      throw new BadRequestException(error.message);
    }
  }

  async setStatus(id: number): Promise<UserDto>{
    try {
      let user = await this.findOne(id);
      await this._userRepository.update(id, {isActive: !user.isActive});
      user = await this.findOne(id);
      return this._userMapper.dtoToEntity(user);
    }
    catch(error){
      throw new BadRequestException(error.message);
    }
  }
}