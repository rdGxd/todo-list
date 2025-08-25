import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para resposta de autenticação (login/refresh).
 * Contém os tokens JWT gerados para o usuário autenticado.
 */
export class AuthResponseDto {
  /**
   * Token JWT de acesso para autenticação nas requisições
   */
  @ApiProperty({
    description: 'Token JWT de acesso para autenticação',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    format: 'jwt',
  })
  accessToken: string;

  /**
   * Token JWT de refresh para renovação do access token
   */
  @ApiProperty({
    description: 'Token JWT de refresh para renovação',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyNDI2MjJ9.4Adcj3UFYzPUVaVF43FmMab6RlaQD8A9V8wOGznBBZM',
    format: 'jwt',
  })
  refreshToken: string;

  /**
   * Tempo de expiração do access token em segundos
   */
  @ApiProperty({
    description: 'Tempo de expiração do access token em segundos',
    example: 3600,
    type: 'integer',
  })
  expiresIn: number;

  /**
   * Tipo do token (sempre "Bearer")
   */
  @ApiProperty({
    description: 'Tipo do token de autenticação',
    example: 'Bearer',
    default: 'Bearer',
  })
  tokenType: string;
}
