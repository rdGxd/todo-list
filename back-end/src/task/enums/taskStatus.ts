/**
 * Enum que define os possíveis status de uma tarefa
 * Usado para controlar o estado/progresso das tarefas no sistema
 */
export enum taskStatus {
  PENDING = 'PENDING', // Tarefa criada mas ainda não iniciada
  IN_PROGRESS = 'IN_PROGRESS', // Tarefa em andamento
  COMPLETED = 'COMPLETED', // Tarefa finalizada/concluída
}
