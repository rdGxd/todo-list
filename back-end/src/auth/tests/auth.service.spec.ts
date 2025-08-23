import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
describe('AuthService', () => {
  /**
   * Teste unitário para o AuthService.
   * Verifica se o serviço de autenticação é definido corretamente.
   */
  describe('AuthService', () => {
    let service: AuthService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [AuthService],
      }).compile();

      service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });
});
