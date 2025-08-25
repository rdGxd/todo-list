// Importa decoradores de validação e enum de status
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
  @IsString()
  taskId: string;

  /**
   * ID do usuário proprietário da tarefa
   */
  @IsString()
  userId: string;

  /**
   * Título da tarefa
   */
  @IsString()
  title: string;

  /**
   * Descrição detalhada da tarefa
   */
  @IsString()
  description: string;

  /**
   * Status atual da tarefa (PENDING, IN_PROGRESS, COMPLETED)
   */
  @IsEnum(taskStatus)
  status: taskStatus;

  /**
   * Data de criação da tarefa (formato string)
   */
  @IsString()
  createdAt: string;

  /**
   * Data da última atualização da tarefa (formato string)
   */
  @IsString()
  updatedAt: string;
}
