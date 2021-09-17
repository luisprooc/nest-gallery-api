import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PhotoDto } from 'src/common/dto/photo/photo.dto';
import { Photo } from '../database/entities/photo.entity';
import { PhotoRepository } from './photo.repository';
import { UserDto } from 'src/common/dto/user/user.dto';
@Injectable()
export class PhotoService {
  constructor(
    private  _photoRepository: PhotoRepository,
  ){}

  async getAllPhotosByUser(id: UserDto['id']): Promise<PhotoDto[]>{
    try {
      const photos: PhotoDto[] = await this._photoRepository.find({
        where: {user: id}
      });
      if(!photos.length) return [];

      return photos;
    }
    catch(error){
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number): Promise<PhotoDto>{
    try {
      const photo: PhotoDto = await this._photoRepository.findOne(id);
      if(!photo) throw new NotFoundException('Photo not found');

      return photo;
    }
    catch(error){
      throw new BadRequestException(error.message);
    }
  }

  async create(photo: PhotoDto): Promise<PhotoDto>{
    try {
      const createdPhoto = await this._photoRepository.save(photo);
      return createdPhoto;
    }
    catch(error){
      throw new BadRequestException(error.message);
    }
  }

  async delete(id: number): Promise<string>{
    try {
      await this.findOne(id);
      await this._photoRepository.delete(id);
      return `The photo with ID ${id} has been deleted`;
    }
    catch(error){
      throw new BadRequestException(error.message);
    }
    
  }

  async update(id: number, photo: PhotoDto): Promise<PhotoDto>{
    try {
      await this._photoRepository.update(id, {text: photo.text});
      const updatedPhoto = this.findOne(id);
      return updatedPhoto;
    }
    catch(error){
      throw new BadRequestException(error.message);
    }
  }

  async deleteAllPhotosUser(id:UserDto['id']): Promise<string>{
    try {
      await this._photoRepository.createQueryBuilder()
      .delete()
      .from(Photo)
      .where({user: id})
      .execute()
      return `Photos deleted`;
    } 
    catch (error) {
      throw new BadRequestException(error.message);
    }
  }

}