import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from 'src/auth/enums/roles';
import { REQUEST_TOKEN_PAYLOAD_KEY } from '../constants/auth.constants';
import { ROUTE_POLICY_KEY } from '../constants/route.constants';

/**
 * Guard responsável por verificar se o usuário autenticado possui pelo menos um dos cargos (roles) exigidos pela rota.
 * Utiliza o payload do token JWT preenchido pelo AuthGuard.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  /**
   * @param reflector Utilizado para acessar os metadados de roles definidos nos decorators das rotas
   */
  constructor(private readonly reflector: Reflector) {}

  /**
   * Verifica se o usuário possui algum dos cargos exigidos pela rota.
   * Lança UnauthorizedException se não possuir permissão.
   */
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Roles | Roles[]>(
      ROUTE_POLICY_KEY,
      context.getHandler(),
    );

    if (!requiredRoles) return true;

    const tokenPayload = context.switchToHttp().getRequest()[
      REQUEST_TOKEN_PAYLOAD_KEY
    ];

    if (!tokenPayload) {
      throw new UnauthorizedException('Token payload not found');
    }

    // Extrai os roles do payload e verifica permissão
    const { roles }: { roles: Roles[] } = tokenPayload,
      userRoles = roles ?? [],
      Roles = ([] as Roles[]).concat(requiredRoles);
    const hasPermission = Roles.some((p) => userRoles.includes(p));

    if (!hasPermission) {
      throw new UnauthorizedException(
        `Usuário não tem a permissão necessária: ${Roles.join(', ')}`,
      );
    }

    return true;
  }
}
