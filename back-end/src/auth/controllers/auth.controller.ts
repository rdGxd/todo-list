import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { RefreshTokenDto } from '../dto/refreshToken.dto';
import { AuthService } from '../services/auth.service';

/**
 * Controller responsável pelas rotas de autenticação (login e refresh de token).
 */
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
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /**
   * Rota para refresh de token. Recebe o refreshToken e retorna novos tokens.
   */
  @Post('refresh')
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto);
  }
}
