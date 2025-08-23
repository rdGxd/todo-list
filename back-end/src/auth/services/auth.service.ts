import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import jwtConfig from '../config/jwt.config';
import { LoginDto } from '../dto/login.dto';
import { RefreshTokenDto } from '../dto/refreshToken.dto';
import { HashingServiceProtocol } from '../hashing/hashing.service';

/**
 * Serviço responsável pela autenticação, geração e renovação de tokens JWT.
 */
@Injectable()
export class AuthService {
  /**
   * @param userRepository Repositório de usuários
   * @param jwtConfiguration Configuração do JWT
   * @param hashingService Serviço de hash de senha
   * @param jwtService Serviço do NestJS para manipulação de JWT
   */
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly hashingService: HashingServiceProtocol,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Realiza o login do usuário, validando e-mail e senha, e retorna os tokens.
   */
  async login(dto: LoginDto) {
    const user = await this.userRepository.findOneBy({ email: dto.email });
    if (!user) {
      throw new Error('Usuário ou senha inválidos');
    }

    if (!(await this.hashingService.compare(dto.password, user.password))) {
      throw new Error('Usuário ou senha inválidos');
    }

    return await this.generateToken(user);
  }

  /**
   * Realiza o refresh do token, validando o refreshToken e retornando novos tokens.
   */
  async refresh(dto: RefreshTokenDto) {
    try {
      const { sub } = await this.jwtService.verifyAsync(
        dto.refreshToken,
        this.jwtConfiguration,
      );

      const user = await this.userRepository.findOneBy({
        id: sub,
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return await this.generateToken(user);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  /**
   * Gera accessToken e refreshToken para o usuário autenticado.
   */
  async generateToken(user: User) {
    const accessTokenPromise = this.signJwtAsync<Partial<User>>(
      user.id,
      this.jwtConfiguration.signOptions.expiresIn,
    );

    const refreshTokenPromise = this.signJwtAsync(
      user.id,
      this.jwtConfiguration.refreshToken,
    );

    const [accessToken, refreshToken] = await Promise.all([
      accessTokenPromise,
      refreshTokenPromise,
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Alternativa para renovar tokens usando outro DTO.
   */
  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub } = await this.jwtService.verifyAsync(
        refreshTokenDto.refreshToken,
        this.jwtConfiguration,
      );

      const user = await this.userRepository.findOneBy({
        id: sub,
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return await this.generateToken(user);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  /**
   * Assina e gera um token JWT com o payload e configurações fornecidas.
   */
  private async signJwtAsync<T>(sub: string, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub,
        ...payload,
      },
      {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.signOptions.audience,
        issuer: this.jwtConfiguration.signOptions.issuer,
        expiresIn,
      },
    );
  }
}
