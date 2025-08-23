// DTO utilizado para receber o refresh token enviado pelo cliente na requisição de renovação de tokens.
import { IsString } from 'class-validator';

/**
 * Representa o corpo da requisição para refresh de token.
 * O campo refreshToken deve conter o JWT de refresh enviado pelo cliente.
 */
export class RefreshTokenDto {
  /**
   * Token JWT de refresh enviado pelo cliente.
   */
  @IsString()
  refreshToken: string;
}
