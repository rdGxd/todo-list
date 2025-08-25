// Importa decorators de validação do class-validator
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

/**
 * DTO para criação de usuário
 * Define a estrutura e validações para dados de entrada na criação de usuários
 */
export class CreateUserDto {
  // Validação de email: deve ser um formato de email válido
  @IsEmail()
  email: string;

  // Validação de nome: string entre 3 e 50 caracteres, não pode ser vazio
  @IsString()
  @Length(3, 50)
  @IsNotEmpty()
  name: string;

  // Validação de senha: string entre 6 e 20 caracteres, não pode ser vazia
  @IsString()
  @Length(6, 20)
  @IsNotEmpty()
  password: string;
}
