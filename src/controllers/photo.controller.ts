import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { PhotoDto } from 'src/common/dto/photo/photo.dto';
import { PhotoService } from 'src/modules/photo/photo.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt.auth.guard';
@Controller('photos')
@UseGuards(ThrottlerGuard)
export class PhotoController {
  constructor(private _photoService: PhotoService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/user/:id')
  findAll(@Param('id', ParseIntPipe) id: number): Promise<PhotoDto[]> {
    return this._photoService.getAllPhotosByUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  find(@Param('id', ParseIntPipe) id: number): Promise<PhotoDto> {
    return this._photoService.findOne(id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPhoto: PhotoDto): Promise<PhotoDto> {
    return this._photoService.create(createPhoto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this._photoService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updatePhoto: PhotoDto
  ): Promise<PhotoDto> {
    return this._photoService.update(id,updatePhoto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/user/:id')
  deletePhotos(
    @Param('id', ParseIntPipe) id: number, 
  ): Promise<string> {
    return this._photoService.deleteAllPhotosUser(id);
  }
}


