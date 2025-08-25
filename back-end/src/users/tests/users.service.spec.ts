import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
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
          },
        },
        {
          provide: HashingServiceProtocol,
          useValue: { hash: jest.fn(), compare: jest.fn() },
        },
        {
          provide: UserMapper,
          useValue: { toEntity: jest.fn(), toDto: jest.fn() },
        },
        {
          provide: TaskMapper,
          useValue: { toEntity: jest.fn(), toDto: jest.fn() },
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
});

const createUser = () => {
  let user: CreateUserDto = new CreateUserDto();
  user.email = 'test@example.com';
  user.name = 'Test User';
  user.password = 'password123';

  return user;
};
