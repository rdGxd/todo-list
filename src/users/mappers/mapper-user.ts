import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ResponseUserDto } from '../dtos/response-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserMapper {
  toResponse(user: User): ResponseUserDto {
    const responseUser = new ResponseUserDto();
    responseUser.id = user.id;
    responseUser.email = user.email;
    responseUser.name = user.name;
    responseUser.createdAt = user.createdAt;
    responseUser.updatedAt = user.updatedAt;
    return responseUser;
  }

  toEntity(dto: CreateUserDto) {
    const user = new User();
    user.email = dto.email;
    user.name = dto.name;
    user.password = dto.password;
    return user;
  }
}
