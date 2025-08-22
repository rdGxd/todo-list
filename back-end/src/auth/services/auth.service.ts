import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from '../dto/login.dto';
import { HashingServiceProtocol } from '../hashing/hashing.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly hashingService: HashingServiceProtocol,
    private readonly configService: ConfigService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.userRepository.findOneBy({ email: dto.email });
    if (!user) {
      throw new Error('Usuário ou senha inválidos');
    }

    if (!(await this.hashingService.compare(dto.password, user.password))) {
      throw new Error('Usuário ou senha inválidos');
    }

    const payload = { sub: user.id, email: user.email };
    return {
      accessToken: await this.generateToken(payload),
      refreshToken: await this.generateRefreshToken(payload),
    };
  }

  async generateToken(payload: { sub: string; email: string }) {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      audience: this.configService.get('JWT_TOKEN_AUDIENCE'),
      expiresIn: this.configService.get('JWT_TTL'),
      issuer: this.configService.get('JWT_TOKEN_ISSUER'),
    });
  }

  async generateRefreshToken(payload: { sub: string; email: string }) {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      audience: this.configService.get('JWT_TOKEN_AUDIENCE'),
      expiresIn: this.configService.get('JWT_REFRESH_TTL'),
      issuer: this.configService.get('JWT_TOKEN_ISSUER'),
    });
  }
}
