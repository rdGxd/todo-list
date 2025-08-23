import { SetMetadata } from '@nestjs/common';
import { ROUTE_POLICY_KEY } from '../constants/route.constants';
import { Role } from '../enums/roles';

/**
 * Decorator para definir as roles/políticas de acesso de uma rota.
 * @param args Lista de roles permitidas
 */
export const SetRoutePolicy = (...args: Role[]) => {
  return SetMetadata(ROUTE_POLICY_KEY, args);
};
