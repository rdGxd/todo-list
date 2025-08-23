import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
// DTO utilizado para autenticação de usuários (login).

/**
 * Representa o corpo da requisição de login.
 * Contém o e-mail e a senha do usuário.
 */
export class LoginDto {
  /**
   * E-mail do usuário para login.
   */
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  /**
   * Senha do usuário para login.
   */
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
