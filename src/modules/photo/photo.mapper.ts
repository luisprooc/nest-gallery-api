import { Photo } from "src/modules/database/entities/photo.entity";
import { PhotoDto } from "../../common/dto/photo/photo.dto";

export class PhotoMapper {
  dtoToEntity(photoDto: PhotoDto): Photo {
    return new Photo(
      photoDto.id,
      photoDto.url,
      photoDto.text,
      photoDto.user,
    );
  }

  entityToDto(photo: Photo): PhotoDto {
    return new PhotoDto(
      photo.id,
      photo.url,
      photo.text,
      photo.user
    );
  }
}