import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import jwtConfig from '../config/jwt.config';
import { REQUEST_TOKEN_PAYLOAD_KEY } from '../constants/auth.constants';

/**
 * Guard responsável por validar o token JWT e garantir que o usuário está autenticado.
 * Adiciona o payload do token (com roles) ao request para uso em outros guards.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  /**
   * @param userRepository Repositório de usuários para buscar dados do usuário autenticado
   * @param jwtService Serviço para validação do JWT
   * @param jwtConfiguration Configuração do JWT
   */
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  /**
   * Valida o token JWT, busca o usuário e adiciona o payload ao request.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verify(
        token,
        this.jwtConfiguration,
      );

      const user = await this.userRepository.findOneBy({ id: payload.sub });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Adiciona os roles do usuário ao payload e ao request
      payload['roles'] = user.roles;
      request[REQUEST_TOKEN_PAYLOAD_KEY] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  /**
   * Extrai o token JWT do header Authorization.
   */
  private extractTokenFromHeader(request: Request) {
    return request.headers.authorization?.split(' ')[1] || undefined;
  }
}
