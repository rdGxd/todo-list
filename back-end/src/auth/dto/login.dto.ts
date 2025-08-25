import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

/**
 * DTO utilizado para autenticação de usuários (login).
 * Representa o corpo da requisição de login contendo e-mail e senha do usuário.
 */
export class LoginDto {
  /**
   * E-mail do usuário para login.
   */
  @ApiProperty({
    description: 'E-mail do usuário para autenticação',
    example: 'usuario@exemplo.com',
    format: 'email',
    maxLength: 255,
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  /**
   * Senha do usuário para login.
   */
  @ApiProperty({
    description: 'Senha do usuário para autenticação',
    example: 'minhasenha123',
    minLength: 6,
    maxLength: 20,
    format: 'password',
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
