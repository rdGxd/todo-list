import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ResponseUserDto } from '../dtos/response-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserMapper {
  toResponse(user: User): ResponseUserDto {
    return plainToInstance(ResponseUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  toEntity(dto: CreateUserDto) {
    return plainToInstance(User, dto);
  }
}
