import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PhotoDto } from 'src/common/dto/photo.dto';
import { Photo } from '../database/entities/photo.entity';
import { PhotoRepository } from './photo.repository';
import { PhotoMapper } from './photo.mapper';
import { User } from '../database/entities/user.entity';

@Injectable()
export class PhotoService {
  constructor(
    private  _photoRepository: PhotoRepository,
    private _photoMapper: PhotoMapper
  ){}

  async getAllPhotosByUser(id: User['id']): Promise<PhotoDto[]>{
    try {
      const photos: Photo[] = await this._photoRepository.find({
        where: {user: id}
      });
      if(!photos.length) return [];

      return photos.map(photo => this._photoMapper.entityToDto(photo));
    }
    catch(error){
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number): Promise<PhotoDto>{
    try {
      const photo: Photo = await this._photoRepository.findOne(id);
      if(!photo) throw new NotFoundException('Photo not found');

      return this._photoMapper.entityToDto(photo);
    }
    catch(error){
      throw new BadRequestException(error.message);
    }
  }

  async create(photo:Photo): Promise<PhotoDto>{
    try {
      const createdPhoto = await this._photoRepository.save(photo);
      return this._photoMapper.entityToDto(createdPhoto);
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

  async update(id: number, photo: Photo): Promise<PhotoDto>{
    try {
      await this._photoRepository.update(id, {text: photo.text});
      const updatedPhoto = this.findOne(id);
      return updatedPhoto;
    }
    catch(error){
      throw new BadRequestException(error.message);
    }
  }

}