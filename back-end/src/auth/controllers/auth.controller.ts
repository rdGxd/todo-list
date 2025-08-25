import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { LoginDto } from '../dto/login.dto';
import { RefreshTokenDto } from '../dto/refreshToken.dto';
import { AuthService } from '../services/auth.service';

/**
 * Controller responsável pelas rotas de autenticação (login e refresh de token).
 */
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  /**
   * @param authService Serviço de autenticação
   */
  constructor(private readonly authService: AuthService) {}

  /**
   * Rota para login do usuário. Recebe e-mail e senha e retorna tokens.
   */
  @Post('login')
  @ApiOperation({
    summary: 'Autenticação de usuário',
    description:
      'Realiza login do usuário com email e senha, retornando tokens JWT',
  })
  @ApiBody({
    type: LoginDto,
    description: 'Credenciais de login do usuário',
    examples: {
      example1: {
        summary: 'Login válido',
        description: 'Exemplo de login com credenciais válidas',
        value: {
          email: 'usuario@exemplo.com',
          password: 'minhasenha123',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login realizado com sucesso',
    type: AuthResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Credenciais inválidas',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Unauthorized' },
        error: { type: 'string', example: 'Unauthorized' },
      },
    },
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /**
   * Rota para refresh de token. Recebe o refreshToken e retorna novos tokens.
   */
  @Post('refresh')
  @ApiOperation({
    summary: 'Renovação de token',
    description: 'Renova o access token usando o refresh token',
  })
  @ApiBody({
    type: RefreshTokenDto,
    description: 'Token de refresh para renovação',
    examples: {
      example1: {
        summary: 'Refresh token válido',
        description: 'Exemplo de renovação de token',
        value: {
          refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Token renovado com sucesso',
    type: AuthResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token inválido ou expirado',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Invalid refresh token' },
        error: { type: 'string', example: 'Unauthorized' },
      },
    },
  })
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto);
  }
}
