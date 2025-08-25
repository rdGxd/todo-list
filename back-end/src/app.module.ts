import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModuleConfig } from './global/typeOrmModule.config';
import { TaskModule } from './task/task.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModuleConfig,
    UsersModule,
    AuthModule,
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
