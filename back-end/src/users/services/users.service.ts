import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { HashingServiceProtocol } from 'src/auth/hashing/hashing.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user.entity';
import { UserMapper } from '../mappers/mapper-user';

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

  findOne(id: string, payload: PayloadDto) {
    return this.usersRepository.findOneBy({ id });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.usersRepository.delete(id);
  }
}
