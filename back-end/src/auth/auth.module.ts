import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { AuthController } from './controllers/auth.controller';
import { BCryptPasswordService } from './hashing/BcryptPassword.service';
import { HashingServiceProtocol } from './hashing/hashing.service';
import { AuthService } from './services/auth.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get('JWT_TTL'),
          audience: config.get('JWT_TOKEN_AUDIENCE'),
          issuer: config.get('JWT_TOKEN_ISSUER'),
        },
      }),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingServiceProtocol,
      useClass: BCryptPasswordService,
    },
  ],
  exports: [HashingServiceProtocol],
})
export class AuthModule {}
