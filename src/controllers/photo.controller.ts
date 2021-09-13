import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { PhotoDto } from 'src/common/dto/photo.dto';
import { Photo } from 'src/modules/database/entities/photo.entity';
import { User } from 'src/modules/database/entities/user.entity';
import { PhotoService } from 'src/modules/photo/photo.service';

@Controller('photos')
export class PhotoController {
  constructor(private _photoService: PhotoService) {}

  @Get('/user/:id')
  findAll(@Param('id', ParseIntPipe) id: User['id']): Promise<PhotoDto[]> {
    return this._photoService.getAllPhotosByUser(id);
  }

  @Get(':id')
  find(@Param('id', ParseIntPipe) id: number): Promise<PhotoDto> {
    return this._photoService.findOne(id);
  }
  
  @Post()
  create(@Body() createPhoto: Photo): Promise<PhotoDto> {
    return this._photoService.create(createPhoto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this._photoService.delete(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updatePhoto: Photo
  ): Promise<PhotoDto> {
    return this._photoService.update(id,updatePhoto);
  }
}


