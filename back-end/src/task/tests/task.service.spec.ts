import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Task } from '../entities/task.entity';
import { taskStatus } from '../enums/taskStatus';
import { TaskMapper } from '../mappers/mapper-taks';
import { TaskService } from '../service/task.service';

describe('TaskService', () => {
  let service: TaskService;
  let taskRepository: Repository<Task>;
  let userRepository: Repository<User>;
  let taskMapper: TaskMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findOneBy: jest.fn(),
            delete: jest.fn(),
            preload: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: TaskMapper,
          useValue: {
            toEntity: jest.fn(),
            toResponse: jest.fn().mockReturnValue({
              id: '1',
              title: 'Test Task',
              description: 'Test Description',
              status: taskStatus.PENDING,
              createdAt: new Date(),
              updatedAt: new Date(),
              user: {
                id: '1',
                email: 'test@example.com',
                name: 'Test User',
              },
            }),
          },
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    taskRepository = module.get<Repository<Task>>(getRepositoryToken(Task));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    taskMapper = module.get<TaskMapper>(TaskMapper);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(taskRepository).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(taskMapper).toBeDefined();
  });

  it('should create task', async () => {
    const createTaskDto = {
      title: 'Test Task',
      description: 'Test Description',
    } as CreateTaskDto;
    const payload = { sub: '1' } as PayloadDto;
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      tasks: [],
    };
    const mockTask = {
      id: '1',
      title: 'Test Task',
      description: 'Test Description',
      status: taskStatus.PENDING,
      user: mockUser,
    };

    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(mockUser as any);
    jest.spyOn(taskMapper, 'toEntity').mockReturnValue(mockTask as any);
    jest.spyOn(taskRepository, 'save').mockResolvedValue(mockTask as any);
    jest.spyOn(userRepository, 'save').mockResolvedValue(mockUser as any);

    const result = await service.create(createTaskDto, payload);

    expect(result).toBeDefined();
    expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
    expect(taskMapper.toEntity).toHaveBeenCalledWith(createTaskDto);
    expect(taskRepository.save).toHaveBeenCalledWith(mockTask);
    expect(userRepository.save).toHaveBeenCalledWith(mockUser);
    expect(taskMapper.toResponse).toHaveBeenCalledWith(mockTask);
  });

  it('should throw error when creating task with non-existent user', async () => {
    const createTaskDto = {
      title: 'Test Task',
      description: 'Test Description',
    } as CreateTaskDto;
    const payload = { sub: '1' } as PayloadDto;

    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

    await expect(service.create(createTaskDto, payload)).rejects.toThrow(
      'User not found',
    );
  });

  it('should find all tasks for user', async () => {
    const payload = { sub: '1' } as PayloadDto;
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      tasks: [],
    };
    const mockTasks = [
      {
        id: '1',
        title: 'Task 1',
        description: 'Description 1',
        status: taskStatus.PENDING,
        user: mockUser,
      },
      {
        id: '2',
        title: 'Task 2',
        description: 'Description 2',
        status: taskStatus.COMPLETED,
        user: mockUser,
      },
    ];

    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(mockUser as any);
    jest.spyOn(taskRepository, 'find').mockResolvedValue(mockTasks as any);

    const result = await service.findAll(payload);

    expect(result).toBeDefined();
    expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
    expect(taskRepository.find).toHaveBeenCalledWith({
      where: { user: mockUser },
      relations: ['user', 'user.tasks'],
    });
    expect(taskMapper.toResponse).toHaveBeenCalledTimes(2);
  });

  it('should throw error when finding all tasks with non-existent user', async () => {
    const payload = { sub: '1' } as PayloadDto;

    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

    await expect(service.findAll(payload)).rejects.toThrow('User not found');
  });

  it('should find one task', async () => {
    const payload = { sub: '1' } as PayloadDto;
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      tasks: [],
    };
    const mockTask = {
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      status: taskStatus.PENDING,
      user: mockUser,
    };

    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(mockUser as any);
    jest.spyOn(taskRepository, 'findOne').mockResolvedValue(mockTask as any);

    const result = await service.findOne('1', payload);

    expect(result).toBeDefined();
    expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
    expect(taskRepository.findOne).toHaveBeenCalledWith({
      where: { id: '1', user: mockUser },
      relations: ['user', 'user.tasks'],
    });
    expect(taskMapper.toResponse).toHaveBeenCalledWith(mockTask);
  });

  it('should throw error when finding task with non-existent user', async () => {
    const payload = { sub: '1' } as PayloadDto;

    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

    await expect(service.findOne('1', payload)).rejects.toThrow(
      'User not found',
    );
  });

  it('should throw error when task not found', async () => {
    const payload = { sub: '1' } as PayloadDto;
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      tasks: [],
    };

    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(mockUser as any);
    jest.spyOn(taskRepository, 'findOne').mockResolvedValue(null);

    await expect(service.findOne('1', payload)).rejects.toThrow(
      'Task not found',
    );
  });

  it('should update task', async () => {
    const updateTaskDto = { title: 'Updated Task' } as UpdateTaskDto;
    const payload = { sub: '1' } as PayloadDto;
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      tasks: [],
    };
    const mockTask = {
      id: '1',
      title: 'Updated Task',
      description: 'Description',
      status: taskStatus.PENDING,
      user: mockUser,
    };

    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(mockUser as any);
    jest.spyOn(taskRepository, 'findOne').mockResolvedValue(mockTask as any);
    jest.spyOn(taskRepository, 'save').mockResolvedValue(mockTask as any);

    const result = await service.update('1', updateTaskDto, payload);

    expect(result).toBeDefined();
    expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
    expect(taskRepository.findOne).toHaveBeenCalledWith({
      where: { id: '1', user: mockUser },
      relations: ['user', 'user.tasks'],
    });
    expect(taskRepository.save).toHaveBeenCalledWith(mockTask);
    expect(taskMapper.toResponse).toHaveBeenCalledWith(mockTask);
  });

  it('should throw error when updating with non-existent user', async () => {
    const updateTaskDto = { title: 'Updated Task' } as UpdateTaskDto;
    const payload = { sub: '1' } as PayloadDto;

    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

    await expect(service.update('1', updateTaskDto, payload)).rejects.toThrow(
      'User not found',
    );
  });

  it('should throw error when updating non-existent task', async () => {
    const updateTaskDto = { title: 'Updated Task' } as UpdateTaskDto;
    const payload = { sub: '1' } as PayloadDto;
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      tasks: [],
    };

    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(mockUser as any);
    jest.spyOn(taskRepository, 'findOne').mockResolvedValue(null);

    await expect(service.update('1', updateTaskDto, payload)).rejects.toThrow(
      'Task not found',
    );
  });

  it('should remove task', async () => {
    const payload = { sub: '1' } as PayloadDto;
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      tasks: [],
    };
    const mockTask = {
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      status: taskStatus.PENDING,
      user: mockUser,
    };

    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(mockUser as any);
    jest.spyOn(taskRepository, 'findOne').mockResolvedValue(mockTask as any);
    jest.spyOn(taskRepository, 'remove').mockResolvedValue(mockTask as any);

    const result = await service.remove('1', payload);

    expect(result).toBeDefined();
    expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
    expect(taskRepository.findOne).toHaveBeenCalledWith({
      where: { id: '1', user: mockUser },
      relations: ['user', 'user.tasks'],
    });
    expect(taskRepository.remove).toHaveBeenCalledWith(mockTask);
    expect(taskMapper.toResponse).toHaveBeenCalledWith(mockTask);
  });

  it('should throw error when removing with non-existent user', async () => {
    const payload = { sub: '1' } as PayloadDto;

    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

    await expect(service.remove('1', payload)).rejects.toThrow(
      'User not found',
    );
  });

  it('should throw error when removing non-existent task', async () => {
    const payload = { sub: '1' } as PayloadDto;
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      tasks: [],
    };

    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(mockUser as any);
    jest.spyOn(taskRepository, 'findOne').mockResolvedValue(null);

    await expect(service.remove('1', payload)).rejects.toThrow(
      'Task not found',
    );
  });

  it('should find tasks by status', async () => {
    const payload = { sub: '1' } as PayloadDto;
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      tasks: [],
    };
    const mockTasks = [
      {
        id: '1',
        title: 'Task 1',
        description: 'Description 1',
        status: taskStatus.PENDING,
        user: mockUser,
      },
    ];

    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(mockUser as any);
    jest.spyOn(taskRepository, 'find').mockResolvedValue(mockTasks as any);

    const result = await service.findTasksForStatus(
      taskStatus.PENDING,
      payload,
    );

    expect(result).toBeDefined();
    expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
    expect(taskRepository.find).toHaveBeenCalledWith({
      where: { user: mockUser, status: taskStatus.PENDING },
      relations: ['user', 'user.tasks'],
    });
    expect(taskMapper.toResponse).toHaveBeenCalledTimes(1);
  });

  it('should throw error when finding tasks by status with non-existent user', async () => {
    const payload = { sub: '1' } as PayloadDto;

    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

    await expect(
      service.findTasksForStatus(taskStatus.PENDING, payload),
    ).rejects.toThrow('User not found');
  });
});
