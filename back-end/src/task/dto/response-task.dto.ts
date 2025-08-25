import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { taskStatus } from '../enums/taskStatus';

/**
 * DTO (Data Transfer Object) para resposta de operações com tarefas.
 * Define a estrutura padronizada dos dados de uma tarefa retornados pela API.
 */
export class ResponseTaskDto {
  /**
   * ID único da tarefa
   */
  @ApiProperty({
    description: 'Identificador único da tarefa',
    example: '123e4567-e89b-12d3-a456-426614174001',
    format: 'uuid',
  })
  @IsString()
  taskId: string;

  /**
   * ID do usuário proprietário da tarefa
   */
  @ApiProperty({
    description: 'Identificador do usuário proprietário da tarefa',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @IsString()
  userId: string;

  /**
   * Título da tarefa
   */
  @ApiProperty({
    description: 'Título da tarefa',
    example: 'Estudar NestJS',
  })
  @IsString()
  title: string;

  /**
   * Descrição detalhada da tarefa
   */
  @ApiProperty({
    description: 'Descrição detalhada da tarefa',
    example:
      'Estudar os conceitos básicos do framework NestJS e implementar uma API REST',
  })
  @IsString()
  description: string;

  /**
   * Status atual da tarefa (PENDING, IN_PROGRESS, COMPLETED)
   */
  @ApiProperty({
    description: 'Status atual da tarefa',
    example: 'PENDING',
    enum: taskStatus,
  })
  @IsEnum(taskStatus)
  status: taskStatus;

  /**
   * Data de criação da tarefa (formato string)
   */
  @ApiProperty({
    description: 'Data e hora de criação da tarefa',
    example: '2024-01-15T10:30:00.000Z',
    format: 'date-time',
  })
  @IsString()
  createdAt: string;

  /**
   * Data da última atualização da tarefa (formato string)
   */
  @ApiProperty({
    description: 'Data e hora da última atualização da tarefa',
    example: '2024-01-20T14:45:00.000Z',
    format: 'date-time',
  })
  @IsString()
  updatedAt: string;
}
