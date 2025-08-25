import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import jwtConfig from '../config/jwt.config';
import { HashingServiceProtocol } from '../hashing/hashing.service';
import { AuthService } from '../services/auth.service';

describe('AuthService', () => {
  /**
   * Teste unitário para o AuthService.
   * Verifica se o serviço de autenticação é definido corretamente.
   */
  describe('AuthService', () => {
    let service: AuthService;
    let userRepository: Repository<User>;
    let hashingService: HashingServiceProtocol;
    let jwtService: JwtService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AuthService,
          {
            provide: getRepositoryToken(User),
            useValue: {
              findOneBy: jest.fn(),
              save: jest.fn(),
            },
          },
          {
            provide: jwtConfig.KEY,
            useValue: {
              secret: 'test-secret',
              accessTokenTtl: 3600,
              refreshTokenTtl: 86400,
            },
          },
          {
            provide: HashingServiceProtocol,
            useValue: {
              hash: jest.fn(),
              compare: jest.fn(),
            },
          },
          {
            provide: JwtService,
            useValue: {
              signAsync: jest.fn(),
              verifyAsync: jest.fn(),
            },
          },
        ],
      }).compile();

      service = module.get<AuthService>(AuthService);
      userRepository = module.get<Repository<User>>(getRepositoryToken(User));
      hashingService = module.get<HashingServiceProtocol>(
        HashingServiceProtocol,
      );
      jwtService = module.get<JwtService>(JwtService);
    });

    it('should be defined', () => {
      expect(service).toBeDefined();
      expect(userRepository).toBeDefined();
      expect(hashingService).toBeDefined();
      expect(jwtService).toBeDefined();
    });
  });
});
