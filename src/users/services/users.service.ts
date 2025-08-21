import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingServiceProtocol } from 'src/auth/hashing/hashing.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly hashingService: HashingServiceProtocol,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    user.password = await this.hashingService.hash(createUserDto.password);
    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: string) {
    return this.usersRepository.findOne({ where: { id } });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.usersRepository.delete(id);
  }
}
