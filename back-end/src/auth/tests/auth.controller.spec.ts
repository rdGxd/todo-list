import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
describe('AuthController', () => {
  /**
   * Teste unitário para o AuthController.
   * Verifica se o controller de autenticação é definido corretamente.
   */
  describe('AuthController', () => {
    let controller: AuthController;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [AuthController],
        providers: [AuthService],
      }).compile();

      controller = module.get<AuthController>(AuthController);
    });

    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });
});
