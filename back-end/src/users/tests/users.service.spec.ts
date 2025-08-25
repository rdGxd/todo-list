import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { HashingServiceProtocol } from 'src/auth/hashing/hashing.service';
import { TaskMapper } from 'src/task/mappers/mapper-taks';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';
import { UserMapper } from '../mappers/mapper-user';
import { UsersService } from '../service/users.service';

describe('UsersService', () => {
  let service: UsersService;
  let userMapper: UserMapper;
  let taskMapper: TaskMapper;
  let hashingService: HashingServiceProtocol;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
            find: jest.fn(),
            preload: jest.fn(),
            findOneBy: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: HashingServiceProtocol,
          useValue: { hash: jest.fn(), compare: jest.fn() },
        },
        {
          provide: UserMapper,
          useValue: {
            toEntity: jest.fn(),
            toResponse: jest.fn().mockReturnValue({
              id: '1',
              email: 'test@example.com',
              name: 'Test User',
              createdAt: new Date(),
              updatedAt: new Date(),
              roles: [],
              tasks: [],
            }),
          },
        },
        {
          provide: TaskMapper,
          useValue: { toEntity: jest.fn(), toResponse: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userMapper = module.get<UserMapper>(UserMapper);
    taskMapper = module.get<TaskMapper>(TaskMapper);
    hashingService = module.get<HashingServiceProtocol>(HashingServiceProtocol);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
    expect(userMapper).toBeDefined();
    expect(taskMapper).toBeDefined();
    expect(hashingService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  it('should create user', async () => {
    const user = createUser();
    const mockUser = {
      id: '1',
      email: user.email,
      name: user.name,
      password: 'hashed_password',
      tasks: [],
      roles: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(userMapper, 'toEntity').mockReturnValue(mockUser as any);
    jest.spyOn(hashingService, 'hash').mockResolvedValue('hashed_password');
    jest.spyOn(usersRepository, 'create').mockReturnValue(mockUser as any);
    jest.spyOn(usersRepository, 'save').mockResolvedValue(mockUser as any);

    const result = await service.create(user);

    expect(result).toBeDefined();
    expect(usersRepository.create).toHaveBeenCalledWith(mockUser);
    expect(usersRepository.save).toHaveBeenCalledWith(mockUser);
    expect(userMapper.toResponse).toHaveBeenCalledWith(mockUser);
  });

  it('should find all users', async () => {
    const mockUsers = [
      {
        id: '1',
        email: 'user1@example.com',
        name: 'User 1',
        tasks: [],
        roles: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        email: 'user2@example.com',
        name: 'User 2',
        tasks: [],
        roles: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    jest.spyOn(usersRepository, 'find').mockResolvedValue(mockUsers as any);

    const result = await service.findAll();

    expect(result).toBeDefined();
    expect(usersRepository.find).toHaveBeenCalled();
    expect(userMapper.toResponse).toHaveBeenCalledTimes(2);
  });

  it('should find one user', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      tasks: [],
      roles: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const payload = { sub: '1' } as PayloadDto;

    jest.spyOn(usersRepository, 'findOne').mockResolvedValue(mockUser as any);

    const result = await service.findOne('1', payload);

    expect(result).toBeDefined();
    expect(usersRepository.findOne).toHaveBeenCalledWith({
      where: { id: '1' },
      relations: ['tasks', 'tasks.user'],
    });
    expect(userMapper.toResponse).toHaveBeenCalledWith(mockUser);
  });

  it('should throw error when finding user with different id than payload', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      tasks: [],
      roles: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const payload = { sub: '2' } as PayloadDto;

    jest.spyOn(usersRepository, 'findOne').mockResolvedValue(mockUser as any);

    await expect(service.findOne('1', payload)).rejects.toThrow(
      'You can only access your own user data',
    );
  });

  it('should update user', async () => {
    const updateDto = { name: 'Updated Name' };
    const payload = { sub: '1' } as PayloadDto;
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Updated Name',
      tasks: [],
      roles: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(usersRepository, 'findOneBy').mockResolvedValue(mockUser as any);
    jest.spyOn(usersRepository, 'preload').mockResolvedValue(mockUser as any);
    jest.spyOn(usersRepository, 'save').mockResolvedValue(mockUser as any);

    const result = await service.update('1', updateDto, payload);

    expect(result).toBeDefined();
    expect(usersRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
    expect(usersRepository.preload).toHaveBeenCalledWith({
      id: '1',
      ...updateDto,
    });
    expect(usersRepository.save).toHaveBeenCalledWith(mockUser);
    expect(userMapper.toResponse).toHaveBeenCalledWith(mockUser);
  });

  it('should throw error when updating user with different id than payload', async () => {
    const updateDto = { name: 'Updated Name' };
    const payload = { sub: '2' } as PayloadDto;
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      tasks: [],
      roles: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(usersRepository, 'findOneBy').mockResolvedValue(mockUser as any);

    await expect(service.update('1', updateDto, payload)).rejects.toThrow(
      'You can only update your own user data',
    );
  });

  it('should throw error when updating non-existent user', async () => {
    const updateDto = { name: 'Updated Name' };
    const payload = { sub: '1' } as PayloadDto;

    jest.spyOn(usersRepository, 'preload').mockResolvedValue(undefined);

    await expect(service.update('1', updateDto, payload)).rejects.toThrow(
      'User not found',
    );
  });

  it('should update user with password', async () => {
    const updateDto = { name: 'Updated Name', password: 'newPassword' };
    const payload = { sub: '1' } as PayloadDto;
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Updated Name',
      password: 'hashed_new_password',
      tasks: [],
      roles: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(usersRepository, 'findOneBy').mockResolvedValue(mockUser as any);
    jest.spyOn(usersRepository, 'preload').mockResolvedValue(mockUser as any);
    jest.spyOn(hashingService, 'hash').mockResolvedValue('hashed_new_password');
    jest.spyOn(usersRepository, 'save').mockResolvedValue(mockUser as any);

    const result = await service.update('1', updateDto, payload);

    expect(result).toBeDefined();
    expect(usersRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
    expect(hashingService.hash).toHaveBeenCalledWith('newPassword');
    expect(usersRepository.save).toHaveBeenCalledWith(mockUser);
    expect(userMapper.toResponse).toHaveBeenCalledWith(mockUser);
  });

  it('should remove user', async () => {
    const payload = { sub: '1' } as PayloadDto;
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      tasks: [],
      roles: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(usersRepository, 'findOneBy').mockResolvedValue(mockUser as any);
    jest
      .spyOn(usersRepository, 'delete')
      .mockResolvedValue({ affected: 1 } as any);

    const result = await service.remove('1', payload);

    expect(result).toBeDefined();
    expect(usersRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
    expect(usersRepository.delete).toHaveBeenCalledWith('1');
    expect(userMapper.toResponse).toHaveBeenCalledWith(mockUser);
  });

  it('should throw error when removing non-existent user', async () => {
    const payload = { sub: '1' } as PayloadDto;

    jest.spyOn(usersRepository, 'findOneBy').mockResolvedValue(null);

    await expect(service.remove('1', payload)).rejects.toThrow(
      'User not found',
    );
  });

  it('should throw error when removing user with different id than payload', async () => {
    const payload = { sub: '2' } as PayloadDto;
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      tasks: [],
      roles: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(usersRepository, 'findOneBy').mockResolvedValue(mockUser as any);

    await expect(service.remove('1', payload)).rejects.toThrow(
      'You can only access your own user data',
    );
  });
});

const createUser = () => {
  let user: CreateUserDto = new CreateUserDto();
  user.email = 'test@example.com';
  user.name = 'Test User';
  user.password = 'password123';

  return user;
};
