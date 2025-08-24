import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { HashingServiceProtocol } from 'src/auth/hashing/hashing.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';
import { UserMapper } from './mappers/mapper-user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly hashingService: HashingServiceProtocol,
    private readonly userMapper: UserMapper,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userMapper.toEntity(createUserDto);
    user.password = await this.hashingService.hash(createUserDto.password);

    this.usersRepository.create(user);
    await this.usersRepository.save(user);

    return this.userMapper.toResponse(user);
  }

  async findAll() {
    const allUsers = await this.usersRepository.find();
    return allUsers.map((user: User) => this.userMapper.toResponse(user));
  }

  async findOne(id: string, payload: PayloadDto) {
    const user = await this.usersRepository.findOneBy({ id });
    if (user?.id !== payload.sub) {
      throw new Error('You can only access your own user data');
    }
    return this.userMapper.toResponse(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto, payload: PayloadDto) {
    if (id !== payload.sub) {
      throw new Error('You can only update your own user data');
    }

    const { password, ...dtoWithoutPassword } = updateUserDto;

    const user = await this.usersRepository.preload({
      id,
      ...dtoWithoutPassword,
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (password) {
      user.password = await this.hashingService.hash(password);
    }

    await this.usersRepository.save(user);
    return this.userMapper.toResponse(user);
  }

  async remove(id: string, payload: PayloadDto) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.id !== payload.sub) {
      throw new Error('You can only access your own user data');
    }

    await this.usersRepository.delete(id);
    return this.userMapper.toResponse(user);
  }
}
