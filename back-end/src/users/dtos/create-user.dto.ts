import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

/**
 * DTO para criação de usuário
 * Define a estrutura e validações para dados de entrada na criação de usuários
 */
export class CreateUserDto {
  /**
   * E-mail do usuário - deve ser único no sistema
   */
  @ApiProperty({
    description: 'E-mail único do usuário para login e identificação',
    example: 'joao.silva@exemplo.com',
    format: 'email',
    uniqueItems: true,
  })
  @IsEmail()
  email: string;

  /**
   * Nome completo do usuário
   */
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João da Silva',
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @Length(3, 50)
  @IsNotEmpty()
  name: string;

  /**
   * Senha do usuário para autenticação
   */
  @ApiProperty({
    description: 'Senha do usuário para autenticação (será hasheada)',
    example: 'minhasenha123',
    minLength: 6,
    maxLength: 20,
    format: 'password',
  })
  @IsString()
  @Length(6, 20)
  @IsNotEmpty()
  password: string;
}
