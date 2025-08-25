import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Task } from '../entities/task.entity';
import { taskStatus } from '../enums/taskStatus';
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

    return this.taskMapper.toResponse(task);
  }

  async findAll(payload: PayloadDto) {
    const user = await this.userRepository.findOneBy({ id: payload.sub });
    if (!user) {
      throw new Error('User not found');
    }

    const tasks = await this.taskRepository.find({
      where: { user },
      relations: ['user', 'user.tasks'],
    });
    return tasks.map((task) => this.taskMapper.toResponse(task));
  }

  async findOne(id: string, payload: PayloadDto) {
    const user = await this.userRepository.findOneBy({ id: payload.sub });
    if (!user) {
      throw new Error('User not found');
    }

    const task = await this.taskRepository.findOne({
      where: { id, user },
      relations: ['user', 'user.tasks'],
    });
    if (!task) {
      throw new Error('Task not found');
    }
    return this.taskMapper.toResponse(task);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, payload: PayloadDto) {
    const user = await this.userRepository.findOneBy({ id: payload.sub });

    if (!user) {
      throw new Error('User not found');
    }

    const task = await this.taskRepository.findOne({
      where: { id, user },
      relations: ['user', 'user.tasks'],
    });

    if (!task) {
      throw new Error('Task not found');
    }

    await this.taskRepository.preload({
      status: updateTaskDto.status ?? task.status,
      title: updateTaskDto.title ?? task.title,
      description: updateTaskDto.description ?? task.description,
    });

    await this.taskRepository.save(task);
    return this.taskMapper.toResponse(task);
  }

  async remove(id: string, payload: PayloadDto) {
    const user = await this.userRepository.findOneBy({ id: payload.sub });
    if (!user) {
      throw new Error('User not found');
    }

    const task = await this.taskRepository.findOne({
      where: { id, user },
      relations: ['user', 'user.tasks'],
    });
    if (!task) {
      throw new Error('Task not found');
    }

    await this.taskRepository.remove(task);
    return this.taskMapper.toResponse(task);
  }

  async findTasksForStatus(status: taskStatus, payload: PayloadDto) {
    const user = await this.userRepository.findOneBy({ id: payload.sub });
    if (!user) {
      throw new Error('User not found');
    }

    const tasks = await this.taskRepository.find({
      where: { user, status },
      relations: ['user', 'user.tasks'],
    });
    return tasks.map((task) => this.taskMapper.toResponse(task));
  }
}
