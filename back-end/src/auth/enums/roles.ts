/**
 * Enumeração dos cargos/roles possíveis do sistema.
 * Define os níveis de acesso e permissões dos usuários
 */
export enum Roles {
  USER = 'user', // Usuário comum - acesso limitado às próprias tarefas
  ADMIN = 'admin', // Administrador - acesso total ao sistema
}
