import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig = (config: ConfigService): TypeOrmModuleOptions => ({
  type: config.get<string>('TYPEORM_TYPE') as 'postgres',
  host: config.get<string>('DATABASE_HOST'),
  port: config.get<number>('DATABASE_PORT'),
  username: config.get<string>('DATABASE_USERNAME'),
  password: config.get<string>('DATABASE_PASSWORD'),
  database: config.get<string>('DATABASE_NAME'),
  synchronize: config.get<boolean>('DATABASE_SYNCHRONIZE'),
  autoLoadEntities: config.get<boolean>('DATABASE_AUTO_LOAD_ENTITIES'),
});
