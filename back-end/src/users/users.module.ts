import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from 'src/task/task.module';
import { UsersController } from './controller/users.controller';
import { User } from './entities/user.entity';
import { UserMapper } from './mappers/mapper-user';
import { UsersService } from './service/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserMapper],
  exports: [UsersService, TypeOrmModule],
  imports: [TypeOrmModule.forFeature([User]), TaskModule],
})
export class UsersModule {}
