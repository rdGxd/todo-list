import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Task } from '../entities/task.entity';
import { TaskMapper } from '../mappers/mapper-taks';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly taskMapper: TaskMapper,
  ) {}

  async create(createTaskDto: CreateTaskDto, payload: PayloadDto) {
    const user = await this.userRepository.findOneBy({ id: payload.sub });
    if (!user) {
      throw new Error('User not found');
    }

    const task = this.taskMapper.toEntity(createTaskDto);
    task.user = user;
    user.tasks.push(task);
    await this.taskRepository.save(task);
    await this.userRepository.save(user);

    return this.taskMapper.toResponseDto(task);
  }

  findAll() {
    return `This action returns all task`;
  }

  async findOne(id: string) {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new Error('Task not found');
    }
    return this.taskMapper.toResponseDto(task);
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: string) {
    return `This action removes a #${id} task`;
  }
}
