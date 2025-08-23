import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserMapper } from './mappers/mapper-user';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserMapper],
  exports: [UsersService, TypeOrmModule],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
