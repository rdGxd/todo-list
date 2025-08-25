import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig = (config: ConfigService): TypeOrmModuleOptions => ({
  type: config.get<string>('TYPEORM_TYPE') as 'postgres',
  host: config.get<string>('DATABASE_HOST'),
  port: config.get<number>('DATABASE_PORT'),
  username: config.get<string>('DATABASE_USERNAME'),
  password: config.get<string>('DATABASE_PASSWORD'),
  database: config.get<string>('DATABASE_DATABASE'),
  synchronize: config.get<boolean>('DATABASE_SYNCHRONIZE'),
  autoLoadEntities: config.get<boolean>('DATABASE_AUTO_LOAD_ENTITIES'),
});

export const TypeOrmModuleConfig = TypeOrmModule.forRootAsync({
  useFactory: (config: ConfigService) => typeOrmConfig(config),
  inject: [ConfigService],
});
