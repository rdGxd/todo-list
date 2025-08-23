import { IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';
import { Roles } from '../enums/roles';

/**
 * Representa o payload do JWT, contendo informações do usuário e metadados do token.
 */
export class PayloadDto {
  /**
   * ID do usuário (subject do token).
   */
  @IsString()
  sub: string;

  /**
   * E-mail do usuário.
   */
  @IsEmail()
  email: string;

  /**
   * Cargos (roles) do usuário.
   */
  @IsEnum(Roles, { each: true })
  roles: Roles[];

  /**
   * Data de emissão do token (timestamp).
   */
  @IsNumber()
  iat: number;

  /**
   * Data de expiração do token (timestamp).
   */
  @IsNumber()
  exp: number;

  /**
   * Público-alvo do token (audience).
   */
  @IsString()
  aud: string;

  /**
   * Emissor do token (issuer).
   */
  @IsString()
  iss: string;
}
