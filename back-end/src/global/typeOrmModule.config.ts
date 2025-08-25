// Importa dependências necessárias para configuração do TypeORM
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

/**
 * Função que retorna as configurações do TypeORM baseadas nas variáveis de ambiente
 * @param config - Serviço de configuração do NestJS para acessar variáveis de ambiente
 * @returns Objeto de configuração do TypeORM
 */
const typeOrmConfig = (config: ConfigService): TypeOrmModuleOptions => ({
  type: config.get<string>('TYPEORM_TYPE') as 'postgres', // Tipo do banco de dados (PostgreSQL)
  host: config.get<string>('DATABASE_HOST'), // Host do banco de dados
  port: config.get<number>('DATABASE_PORT'), // Porta do banco de dados
  username: config.get<string>('DATABASE_USERNAME'), // Nome de usuário do banco
  password: config.get<string>('DATABASE_PASSWORD'), // Senha do banco de dados
  database: config.get<string>('DATABASE_DATABASE'), // Nome do banco de dados
  synchronize: config.get<boolean>('DATABASE_SYNCHRONIZE'), // Sincronização automática do schema
  autoLoadEntities: config.get<boolean>('DATABASE_AUTO_LOAD_ENTITIES'), // Carregamento automático das entidades
});

/**
 * Configuração assíncrona do módulo TypeORM
 * Permite que as configurações sejam carregadas dinamicamente das variáveis de ambiente
 */
export const TypeOrmModuleConfig = TypeOrmModule.forRootAsync({
  useFactory: (config: ConfigService) => typeOrmConfig(config), // Factory function para criar a configuração
  inject: [ConfigService], // Injeta o ConfigService como dependência
});
