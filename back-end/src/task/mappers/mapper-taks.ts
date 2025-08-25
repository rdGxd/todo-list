import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateTaskDto } from '../dto/create-task.dto';
import { ResponseTaskDto } from '../dto/response-task.dto';
import { Task } from '../entities/task.entity';

@Injectable()
export class TaskMapper {
  toDto(entity: Task): ResponseTaskDto {
    const response = new ResponseTaskDto();
    response.taskId = entity.id;
    response.title = entity.title;
    response.description = entity.description;
    response.status = entity.status;
    response.userId = entity.user.id;
    response.createdAt = entity.createdAt;
    response.updatedAt = entity.updatedAt;
    return response;
  }

  toEntity(dto: CreateTaskDto): Task {
    return plainToInstance(Task, dto);
  }
}
