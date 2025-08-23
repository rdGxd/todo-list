import { registerAs } from '@nestjs/config';

/**
 * Configuração do JWT para uso no NestJS.
 * Lê variáveis de ambiente para definir segredo, tempo de expiração e outros parâmetros.
 */
export default registerAs('jwt', () => {
  return {
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: Number(process.env.JWT_TTL ?? '3600'),
      audience: process.env.JWT_TOKEN_AUDIENCE,
      issuer: process.env.JWT_TOKEN_ISSUER,
    },
    refreshToken: Number(process.env.JWT_REFRESH_TTL ?? '86400'),
  };
});
