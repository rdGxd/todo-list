import { UsersController } from '../controllers/users.controller';

describe('UsersController', () => {
  let controller: UsersController;
  let userServiceMock = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    controller = new UsersController(userServiceMock as any);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
