/**
 * Protocolo/contrato para serviços de hashing.
 * Define métodos para hash e comparação de valores.
 */
export abstract class HashingServiceProtocol {
  /**
   * Gera o hash de um valor.
   */
  abstract hash(value: string): Promise<string>;

  /**
   * Compara um valor com um hash.
   */
  abstract compare(value: string, hashed: string): Promise<boolean>;
}
