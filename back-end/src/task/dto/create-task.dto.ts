// Importa decoradores de validação do class-validator
import { IsString } from 'class-validator';

/**
 * DTO (Data Transfer Object) para criação de uma nova tarefa.
 * Define a estrutura e validações dos dados necessários para criar uma task.
 */
export class CreateTaskDto {
  /**
   * Título da tarefa - obrigatório e deve ser uma string
   */
  @IsString()
  title: string;

  /**
   * Descrição detalhada da tarefa - obrigatório e deve ser uma string
   */
  @IsString()
  description: string;
}
