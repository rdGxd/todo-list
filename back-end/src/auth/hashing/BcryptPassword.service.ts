import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { HashingServiceProtocol } from './hashing.service';

/**
 * Implementação do serviço de hashing usando bcrypt.
 * Fornece métodos para hash e comparação de senhas.
 */
@Injectable()
export class BCryptPasswordService extends HashingServiceProtocol {
  /**
   * Gera o hash de um valor (senha) usando bcrypt.
   * @param value Valor a ser hasheado
   */
  async hash(value: string): Promise<string> {
    const salt = bcrypt.genSaltSync();
    return await bcrypt.hash(value, salt);
  }

  /**
   * Compara um valor com um hash usando bcrypt.
   * @param value Valor em texto puro
   * @param hashed Hash armazenado
   */
  async compare(value: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(value, hashed);
  }
}
