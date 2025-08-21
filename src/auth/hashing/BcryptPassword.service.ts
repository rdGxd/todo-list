import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { HashingServiceProtocol } from './hashing.service';

@Injectable()
export class BCryptPasswordService extends HashingServiceProtocol {
  async hash(value: string): Promise<string> {
    const salt = bcrypt.genSaltSync();
    return await bcrypt.hash(value, salt);
  }
  async compare(value: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(value, hashed);
  }
}
