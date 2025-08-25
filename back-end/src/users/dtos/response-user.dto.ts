// Importa decorators do class-transformer e dependências necessárias
import { Expose } from 'class-transformer';
import { Roles } from 'src/auth/enums/roles';
import { ResponseTaskDto } from 'src/task/dto/response-task.dto';

/**
 * DTO para resposta de operações com usuários.
 * Define quais campos serão expostos nas respostas da API, excluindo dados sensíveis como senha.
 * Utiliza @Expose para controlar explicitamente quais propriedades são serializadas.
 */
export class ResponseUserDto {
  /**
   * ID único do usuário
   */
  @Expose()
  id: string;

  /**
   * Email do usuário
   */
  @Expose()
  email: string;

  /**
   * Nome do usuário
   */
  @Expose()
  name: string;

  /**
   * Data de criação do usuário
   */
  @Expose()
  createdAt: string;

  /**
   * Data da última atualização do usuário
   */
  @Expose()
  updatedAt: string;

  /**
   * Array de roles/cargos do usuário
   */
  @Expose()
  roles: Roles[];

  /**
   * Array de tarefas associadas ao usuário
   */
  @Expose()
  tasks: ResponseTaskDto[];
}
