import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { TaskMapper } from 'src/task/mappers/mapper-taks';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ResponseUserDto } from '../dtos/response-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserMapper {
  constructor(private readonly taskMapper: TaskMapper) {}

  toResponse(user: User): ResponseUserDto {
    const response = new ResponseUserDto();
    response.id = user.id;
    response.email = user.email;
    response.name = user.name;
    response.createdAt = user.createdAt;
    response.updatedAt = user.updatedAt;
    response.roles = user.roles;
    response.tasks = user.tasks.map((task) => this.taskMapper.toResponse(task));
    return response;
  }

  toEntity(dto: CreateUserDto) {
    return plainToInstance(User, dto);
  }
}
