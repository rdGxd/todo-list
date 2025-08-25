import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'Título da tarefa',
    example: 'Estudar NestJS - Atualizado',
    required: false,
    minLength: 1,
    maxLength: 255,
  })
  @IsString()
  @IsOptional()
  title: string;

  /**
   * Descrição da tarefa - opcional na atualização, deve ser string se fornecido
   */
  @ApiProperty({
    description: 'Descrição detalhada da tarefa',
    example: 'Descrição atualizada com mais detalhes sobre o estudo',
    required: false,
    minLength: 1,
    maxLength: 1000,
  })
  @IsString()
  @IsOptional()
  description: string;

  /**
   * Status da tarefa - opcional na atualização, deve ser um valor válido do enum taskStatus
   */
  @ApiProperty({
    description: 'Status atual da tarefa',
    example: 'IN_PROGRESS',
    enum: taskStatus,
    required: false,
  })
  @IsEnum(taskStatus)
  @IsOptional()
  status: taskStatus;
}
