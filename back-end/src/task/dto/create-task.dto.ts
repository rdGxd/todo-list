import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * DTO (Data Transfer Object) para criação de uma nova tarefa.
 * Define a estrutura e validações dos dados necessários para criar uma task.
 */
export class CreateTaskDto {
  /**
   * Título da tarefa - obrigatório e deve ser uma string
   */
  @ApiProperty({
    description: 'Título da tarefa',
    example: 'Estudar NestJS',
    minLength: 1,
    maxLength: 255,
  })
  @IsString()
  title: string;

  /**
   * Descrição detalhada da tarefa - obrigatório e deve ser uma string
   */
  @ApiProperty({
    description: 'Descrição detalhada da tarefa',
    example:
      'Estudar os conceitos básicos do framework NestJS e implementar uma API REST',
    minLength: 1,
    maxLength: 1000,
  })
  @IsString()
  description: string;
}
