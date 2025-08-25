// Importa dependências do NestJS, TypeORM e entidades relacionadas
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

/**
 * Serviço responsável pela lógica de negócio das tarefas.
 * Implementa operações CRUD com validação de autorização baseada no usuário.
 * Todas as operações garantem que usuários só acessem suas próprias tarefas.
 */
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly taskMapper: TaskMapper,
  ) {}

  /**
   * Cria uma nova tarefa para o usuário autenticado.
   * @param createTaskDto Dados para criação da tarefa
   * @param payload Payload do token JWT contendo ID do usuário
   * @returns Tarefa criada formatada como ResponseTaskDto
   */
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

  /**
   * Busca todas as tarefas do usuário autenticado.
   * @param payload Payload do token JWT contendo ID do usuário
   * @returns Array de tarefas formatadas como ResponseTaskDto
   */
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

  /**
   * Busca uma tarefa específica do usuário autenticado.
   * @param id ID da tarefa
   * @param payload Payload do token JWT contendo ID do usuário
   * @returns Tarefa formatada como ResponseTaskDto
   */
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

  /**
   * Atualiza uma tarefa do usuário autenticado.
   * @param id ID da tarefa
   * @param updateTaskDto Dados para atualização
   * @param payload Payload do token JWT contendo ID do usuário
   * @returns Tarefa atualizada formatada como ResponseTaskDto
   */
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

  /**
   * Remove uma tarefa do usuário autenticado.
   * @param id ID da tarefa
   * @param payload Payload do token JWT contendo ID do usuário
   * @returns Tarefa removida formatada como ResponseTaskDto
   */
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

  /**
   * Busca tarefas do usuário autenticado filtradas por status.
   * @param status Status das tarefas a serem buscadas
   * @param payload Payload do token JWT contendo ID do usuário
   * @returns Array de tarefas com o status especificado
   */
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
