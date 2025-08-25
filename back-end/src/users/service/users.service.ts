// Importa decoradores e tipos do NestJS
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Importa DTOs e services de outros módulos
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { HashingServiceProtocol } from 'src/auth/hashing/hashing.service';

// Importa Repository do TypeORM
import { Repository } from 'typeorm';

// Importa DTOs, entidades e mappers locais
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user.entity';
import { UserMapper } from '../mappers/mapper-user';

/**
 * Service responsável pela lógica de negócio dos usuários
 * Implementa operações CRUD e regras de autorização
 */
@Injectable() // Marca a classe como injetável no sistema de DI do NestJS
export class UsersService {
  /**
   * Construtor com injeção de dependências
   * @param usersRepository - Repository para operações no banco de dados
   * @param hashingService - Service para hash/comparação de senhas
   * @param userMapper - Mapper para conversão entre entidades e DTOs
   */
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly hashingService: HashingServiceProtocol,
    private readonly userMapper: UserMapper,
  ) {}

  /**
   * Cria um novo usuário no sistema
   * @param createUserDto - Dados para criação do usuário
   * @returns Promise com os dados do usuário criado (sem senha)
   */
  async create(createUserDto: CreateUserDto) {
    // Converte DTO para entidade
    const user = this.userMapper.toEntity(createUserDto);

    // Aplica hash na senha antes de salvar
    user.password = await this.hashingService.hash(createUserDto.password);

    // Cria e salva o usuário no banco
    this.usersRepository.create(user);
    await this.usersRepository.save(user);

    // Retorna resposta mapeada (sem dados sensíveis)
    return this.userMapper.toResponse(user);
  }

  /**
   * Busca todos os usuários do sistema
   * @returns Promise com array de usuários (sem dados sensíveis)
   */
  async findAll() {
    const allUsers = await this.usersRepository.find();
    return allUsers.map((user: User) => this.userMapper.toResponse(user));
  }

  /**
   * Busca um usuário específico com validação de autorização
   * @param id - ID do usuário a ser buscado
   * @param payload - Dados do token JWT (usuário logado)
   * @returns Promise com dados do usuário e suas tarefas
   */
  async findOne(id: string, payload: PayloadDto) {
    // Busca o usuário com suas tarefas relacionadas
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['tasks', 'tasks.user'], // Inclui tarefas e seus usuários
    });

    // Validação de autorização: usuário só pode acessar seus próprios dados
    if (user?.id !== payload.sub) {
      throw new Error('You can only access your own user data');
    }
    return this.userMapper.toResponse(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto, payload: PayloadDto) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.id !== payload.sub) {
      throw new Error('You can only update your own user data');
    }

    const { password, ...dtoWithoutPassword } = updateUserDto;

    await this.usersRepository.preload({
      id,
      ...dtoWithoutPassword,
    });

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
