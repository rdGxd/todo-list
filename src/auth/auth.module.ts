import { Global, Module } from '@nestjs/common';
import { BCryptPasswordService } from './hashing/BcryptPassword.service';
import { HashingServiceProtocol } from './hashing/hashing.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: HashingServiceProtocol,
      useClass: BCryptPasswordService,
    },
  ],
  exports: [HashingServiceProtocol],
})
export class AuthModule {}
