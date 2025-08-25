// Importa decorador Module do NestJS e módulos de configuração
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModuleConfig } from './global/typeOrmModule.config';
import { TaskModule } from './task/task.module';
import { UsersModule } from './users/users.module';

/**
 * Módulo raiz da aplicação - ponto de entrada principal
 * Importa e configura todos os módulos funcionais da aplicação
 */
@Module({
  imports: [
    // Configura variáveis de ambiente globalmente na aplicação
    ConfigModule.forRoot(),

    // Configuração do banco de dados TypeORM
    TypeOrmModuleConfig,

    // Módulo de gerenciamento de usuários
    UsersModule,

    // Módulo de autenticação e autorização
    AuthModule,

    // Módulo de gerenciamento de tarefas
    TaskModule,
  ],
  controllers: [], // Sem controllers no módulo raiz
  providers: [], // Sem providers no módulo raiz
})
export class AppModule {}
