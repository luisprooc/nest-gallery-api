import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoController } from 'src/controllers/photo.controller';
import { PhotoMapper } from './photo.mapper';
import { PhotoRepository } from './photo.repository';
import { PhotoService } from './photo.service';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoRepository])],
  controllers: [PhotoController],
  providers: [PhotoService,PhotoMapper]
})
export class PhotoModule {}
