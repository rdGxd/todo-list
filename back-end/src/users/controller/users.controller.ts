// Importa dependências do NestJS para criação de endpoints REST
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SetRoutePolicy } from 'src/auth/decorators/set-route-policy.decorator';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { Roles } from 'src/auth/enums/roles';
import { AuthAndPolicyGuard } from 'src/auth/guards/auth-and-policy.guard';
import { TokenPayloadParam } from 'src/auth/params/token-payload.param';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UsersService } from '../service/users.service';

/**
 * Controller responsável pelos endpoints REST para gerenciamento de usuários.
 * Implementa operações CRUD com autenticação e autorização baseada em roles.
 */
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Endpoint para criação de novos usuários.
   * POST /users
   * @param createUserDto Dados para criação do usuário
   * @returns Usuário criado
   */
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * Endpoint para buscar todos os usuários.
   * GET /users
   * @returns Lista de todos os usuários
   */
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  /**
   * Endpoint para buscar um usuário específico por ID.
   * GET /users/:id
   * Requer autenticação e permite acesso para USER ou ADMIN
   * @param id ID do usuário
   * @param payload Payload do token JWT
   * @returns Dados do usuário
   */
  @Get(':id')
  @UseGuards(AuthAndPolicyGuard)
  @SetRoutePolicy(Roles.USER || Roles.ADMIN)
  findOne(@Param('id') id: string, @TokenPayloadParam() payload: PayloadDto) {
    return this.usersService.findOne(id, payload);
  }

  /**
   * Endpoint para atualizar dados de um usuário.
   * PATCH /users/:id
   * Requer autenticação e permite acesso para USER ou ADMIN
   * @param id ID do usuário
   * @param updateUserDto Dados para atualização
   * @param payload Payload do token JWT
   * @returns Usuário atualizado
   */
  @Patch(':id')
  @UseGuards(AuthAndPolicyGuard)
  @SetRoutePolicy(Roles.USER || Roles.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @TokenPayloadParam() payload: PayloadDto,
  ) {
    return this.usersService.update(id, updateUserDto, payload);
  }

  /**
   * Endpoint para remover um usuário.
   * DELETE /users/:id
   * Requer autenticação e permite acesso para USER ou ADMIN
   * @param id ID do usuário
   * @param payload Payload do token JWT
   * @returns Confirmação da remoção
   */
  @Delete(':id')
  @UseGuards(AuthAndPolicyGuard)
  @SetRoutePolicy(Roles.USER || Roles.ADMIN)
  remove(@Param('id') id: string, @TokenPayloadParam() payload: PayloadDto) {
    return this.usersService.remove(id, payload);
  }
}
