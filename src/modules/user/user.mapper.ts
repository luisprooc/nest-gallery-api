import { User } from "src/modules/database/entities/user.entity";
import { UserDto } from "../../common/dto/user.dto";

export class UserMapper {
  dtoToEntity(userDto: UserDto): User {
    return new User(
      userDto.id,
      userDto.fullName,
      userDto.isActive,
      userDto.description,
    );
  }

  entityToDto(user: User): UserDto {
    return new UserDto(
      user.id,
      user.fullName,
      user.isActive,
      user.description
    );
  }
}