import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * DTO utilizado para receber o refresh token enviado pelo cliente na requisição de renovação de tokens.
 * Representa o corpo da requisição para refresh de token JWT.
 */
export class RefreshTokenDto {
  /**
   * Token JWT de refresh enviado pelo cliente.
   */
  @ApiProperty({
    description: 'Token JWT de refresh para renovação do access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    format: 'jwt',
  })
  @IsString()
  refreshToken: string;
}
