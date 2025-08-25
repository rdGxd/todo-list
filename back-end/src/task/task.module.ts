import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { TaskController } from './controller/task.controller';
import { Task } from './entities/task.entity';
import { TaskMapper } from './mappers/mapper-taks';
import { TaskService } from './service/task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), TypeOrmModule.forFeature([User])],
  controllers: [TaskController],
  providers: [TaskService, TaskMapper],
  exports: [TaskMapper],
})
export class TaskModule {}
