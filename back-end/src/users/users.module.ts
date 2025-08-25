// Importa as dependências necessárias do NestJS e TypeORM
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from 'src/task/task.module';
import { UsersController } from './controller/users.controller';
import { User } from './entities/user.entity';
import { UserMapper } from './mappers/mapper-user';
import { UsersService } from './service/users.service';

/**
 * Módulo responsável por gerenciar todas as funcionalidades relacionadas aos usuários.
 * Configura repositórios, serviços, controladores e mappers para o domínio de User.
 * Importa o TaskModule para ter acesso aos mappers de Task.
 */
@Module({
  controllers: [UsersController], // Controller que expõe os endpoints REST para usuários
  providers: [UsersService, UserMapper], // Serviços e mappers disponíveis para injeção
  exports: [UsersService, TypeOrmModule], // Exporta serviços e TypeORM para uso em outros módulos
  imports: [
    TypeOrmModule.forFeature([User]), // Registra o repositório da entidade User
    TaskModule, // Importa TaskModule para ter acesso ao TaskMapper
  ],
})
export class UsersModule {}
