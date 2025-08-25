// Importa as dependências necessárias do NestJS e TypeORM
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { TaskController } from './controller/task.controller';
import { Task } from './entities/task.entity';
import { TaskMapper } from './mappers/mapper-taks';
import { TaskService } from './service/task.service';

/**
 * Módulo responsável por gerenciar todas as funcionalidades relacionadas às tarefas.
 * Configura repositórios, serviços, controladores e mappers para o domínio de Task.
 */
@Module({
  imports: [
    // Registra os repositórios das entidades Task e User para injeção de dependência
    TypeOrmModule.forFeature([Task]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [TaskController], // Controller que expõe os endpoints REST para tarefas
  providers: [TaskService, TaskMapper], // Serviços e mappers disponíveis para injeção
  exports: [TaskMapper], // Exporta o TaskMapper para uso em outros módulos
})
export class TaskModule {}
