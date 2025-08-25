// Importa dependências do NestJS e decorators de validação
import { PartialType } from '@nestjs/mapped-types';
import { ArrayNotEmpty, IsArray, IsEnum, IsOptional } from 'class-validator';
import { Roles } from 'src/auth/enums/roles';
import { CreateUserDto } from './create-user.dto';

/**
 * DTO para atualização de usuário.
 * Herda de CreateUserDto através de PartialType, tornando todos os campos opcionais.
 * Adiciona funcionalidade específica para atualização de roles do usuário.
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {
  /**
   * Array de roles/cargos do usuário - opcional na atualização.
   * Quando fornecido, deve ser um array não vazio com valores válidos do enum Roles.
   */
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Roles, { each: true }) // Valida cada item do array individualmente
  @IsOptional()
  roles?: Roles[];
}
