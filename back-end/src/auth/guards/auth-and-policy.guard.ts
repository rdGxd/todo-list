import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';

/**
 * Guard composto que executa autenticação (AuthGuard) e autorização por cargo/política (RolesGuard).
 * Só permite acesso se ambos os guards permitirem.
 */
@Injectable()
export class AuthAndPolicyGuard implements CanActivate {
  /**
   * @param authTokenGuard Guard de autenticação JWT
   * @param routePolicyGuard Guard de autorização por roles/políticas
   */
  constructor(
    private readonly authTokenGuard: AuthGuard,
    private readonly routePolicyGuard: RolesGuard,
  ) {}

  /**
   * Executa ambos os guards em sequência. Só permite acesso se ambos retornarem true.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthValid = await this.authTokenGuard.canActivate(context);
    if (!isAuthValid) return false;

    return this.routePolicyGuard.canActivate(context);
  }
}
