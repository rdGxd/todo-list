// Importa dependências do NestJS e validadores
import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { taskStatus } from '../enums/taskStatus';
import { CreateTaskDto } from './create-task.dto';

/**
 * DTO (Data Transfer Object) para atualização de uma tarefa.
 * Herda de CreateTaskDto através de PartialType, tornando todos os campos opcionais.
 * Adiciona validação específica para o campo status.
 */
export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  /**
   * Título da tarefa - opcional na atualização, deve ser string se fornecido
   */
  @IsString()
  @IsOptional()
  title: string;

  /**
   * Descrição da tarefa - opcional na atualização, deve ser string se fornecido
   */
  @IsString()
  @IsOptional()
  description: string;

  /**
   * Status da tarefa - opcional na atualização, deve ser um valor válido do enum taskStatus
   */
  @IsString()
  @IsOptional()
  @IsEnum(taskStatus)
  status: any;
}
