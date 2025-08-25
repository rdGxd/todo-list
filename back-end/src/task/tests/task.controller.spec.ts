import { Test, TestingModule } from '@nestjs/testing';
import { AuthAndPolicyGuard } from 'src/auth/guards/auth-and-policy.guard';
import { TaskController } from '../controller/task.controller';
import { TaskService } from '../service/task.service';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            findTasksForStatus: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthAndPolicyGuard)
      .useValue({
        canActivate: jest.fn().mockReturnValue(true),
      })
      .compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
