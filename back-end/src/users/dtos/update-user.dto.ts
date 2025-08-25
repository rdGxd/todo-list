import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'Roles/cargos do usuário no sistema',
    example: ['user'],
    enum: Roles,
    isArray: true,
    required: false,
    default: [Roles.USER],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Roles, { each: true }) // Valida cada item do array individualmente
  @IsOptional()
  roles?: Roles[];
}
