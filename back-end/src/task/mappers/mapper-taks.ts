// Importa dependências do NestJS e class-transformer
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateTaskDto } from '../dto/create-task.dto';
import { ResponseTaskDto } from '../dto/response-task.dto';
import { Task } from '../entities/task.entity';

/**
 * Mapper responsável por converter entre entidades Task e DTOs.
 * Centraliza a lógica de transformação de dados entre as camadas da aplicação.
 */
@Injectable()
export class TaskMapper {
  /**
   * Converte uma entidade Task em um DTO de resposta.
   * Mapeia todos os campos necessários para a resposta da API.
   * @param entity Entidade Task do banco de dados
   * @returns ResponseTaskDto formatado para resposta da API
   */
  toResponse(entity: Task): ResponseTaskDto {
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

  /**
   * Converte um DTO de criação em uma entidade Task.
   * Utiliza class-transformer para fazer a conversão automática.
   * @param dto DTO com dados para criação da tarefa
   * @returns Entidade Task para persistência no banco
   */
  toEntity(dto: CreateTaskDto): Task {
    return plainToInstance(Task, dto);
  }
}
