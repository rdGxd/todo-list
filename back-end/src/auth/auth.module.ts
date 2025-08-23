import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import jwtConfig from './config/jwt.config';
import { AuthController } from './controllers/auth.controller';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { BCryptPasswordService } from './hashing/BcryptPassword.service';
import { HashingServiceProtocol } from './hashing/hashing.service';
import { AuthService } from './services/auth.service';

/**
 * Módulo global de autenticação, responsável por fornecer serviços, guards e configuração JWT.
 */
@Global()
@Module({
  imports: [
    // Configuração do JWT via arquivo de configuração customizado
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    // Importa entidade User para uso nos serviços
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [
    // Protocolo de hashing injetado via implementação concreta
    {
      provide: HashingServiceProtocol,
      useClass: BCryptPasswordService,
    },
    AuthService,
    RolesGuard,
    AuthGuard,
  ],
  exports: [
    HashingServiceProtocol,
    ConfigModule,
    JwtModule,
    AuthGuard,
    RolesGuard,
  ],
})
export class AuthModule {}
