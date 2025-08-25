import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'Identificador único do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @Expose()
  id: string;

  /**
   * Email do usuário
   */
  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'joao.silva@exemplo.com',
    format: 'email',
  })
  @Expose()
  email: string;

  /**
   * Nome do usuário
   */
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João da Silva',
  })
  @Expose()
  name: string;

  /**
   * Data de criação do usuário
   */
  @ApiProperty({
    description: 'Data e hora de criação do usuário',
    example: '2024-01-15T10:30:00.000Z',
    format: 'date-time',
  })
  @Expose()
  createdAt: string;

  /**
   * Data da última atualização do usuário
   */
  @ApiProperty({
    description: 'Data e hora da última atualização do usuário',
    example: '2024-01-20T14:45:00.000Z',
    format: 'date-time',
  })
  @Expose()
  updatedAt: string;

  /**
   * Array de roles/cargos do usuário
   */
  @ApiProperty({
    description: 'Roles/cargos do usuário no sistema',
    example: ['user'],
    enum: Roles,
    isArray: true,
  })
  @Expose()
  roles: Roles[];

  /**
   * Array de tarefas associadas ao usuário
   */
  @ApiProperty({
    description: 'Lista de tarefas do usuário',
    type: () => ResponseTaskDto,
    isArray: true,
  })
  @Expose()
  tasks: ResponseTaskDto[];
}
