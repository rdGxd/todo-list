// Importa decorators e utilitários necessários
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

// Importa mapper de tarefas para conversão aninhada
import { TaskMapper } from 'src/task/mappers/mapper-taks';

// Importa DTOs e entidades relacionadas
import { CreateUserDto } from '../dtos/create-user.dto';
import { ResponseUserDto } from '../dtos/response-user.dto';
import { User } from '../entities/user.entity';

/**
 * Mapper responsável pela conversão entre entidades User e DTOs
 * Implementa as transformações de dados de entrada e saída
 */
@Injectable()
export class UserMapper {
  /**
   * Injeta o TaskMapper para converter tarefas aninhadas
   */
  constructor(private readonly taskMapper: TaskMapper) {}

  /**
   * Converte uma entidade User para ResponseUserDto
   * Remove dados sensíveis (como senha) e formata a resposta
   * @param user - Entidade User do banco de dados
   * @returns ResponseUserDto - Dados formatados para resposta da API
   */
  toResponse(user: User): ResponseUserDto {
    const response = new ResponseUserDto();
    response.id = user.id;
    response.email = user.email;
    response.name = user.name;
    response.createdAt = user.createdAt;
    response.updatedAt = user.updatedAt;
    response.roles = user.roles;

    // Converte tarefas relacionadas usando o TaskMapper
    response.tasks = user.tasks.map((task) => this.taskMapper.toResponse(task));

    return response;
  }

  /**
   * Converte um CreateUserDto para entidade User
   * Utiliza class-transformer para mapear automaticamente as propriedades
   * @param dto - DTO com dados de criação do usuário
   * @returns User - Entidade pronta para ser salva no banco
   */
  toEntity(dto: CreateUserDto) {
    return plainToInstance(User, dto);
  }
}
