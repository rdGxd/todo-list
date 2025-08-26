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
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SetRoutePolicy } from 'src/auth/decorators/set-route-policy.decorator';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { Roles } from 'src/auth/enums/roles';
import { AuthAndPolicyGuard } from 'src/auth/guards/auth-and-policy.guard';
import { TokenPayloadParam } from 'src/auth/params/token-payload.param';
import { CreateTaskDto } from '../dto/create-task.dto';
import { ResponseTaskDto } from '../dto/response-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { taskStatus } from '../enums/taskStatus';
import { TaskService } from '../service/task.service';

/**
 * Controller responsável pelos endpoints REST para gerenciamento de tarefas.
 * Todas as rotas requerem autenticação e permitem acesso para USER ou ADMIN.
 * Implementa operações CRUD completas com filtros por status.
 */
@ApiTags('Tasks')
@ApiBearerAuth('access-token')
@UseGuards(AuthAndPolicyGuard) // Aplica autenticação e autorização a todas as rotas
@SetRoutePolicy(Roles.USER, Roles.ADMIN) // Define políticas de acesso globais
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  /**
   * Endpoint para criação de novas tarefas.
   * POST /task
   * @param createTaskDto Dados para criação da tarefa
   * @param payload Payload do token JWT
   * @returns Tarefa criada
   */
  @Post()
  @ApiOperation({
    summary: 'Criar nova tarefa',
    description: 'Cria uma nova tarefa para o usuário autenticado',
  })
  @ApiBody({
    type: CreateTaskDto,
    description: 'Dados da tarefa a ser criada',
    examples: {
      example1: {
        summary: 'Tarefa de estudo',
        description: 'Exemplo de criação de tarefa de estudo',
        value: {
          title: 'Estudar NestJS',
          description:
            'Estudar os conceitos básicos do framework NestJS e implementar uma API REST',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Tarefa criada com sucesso',
    type: ResponseTaskDto,
  })
  create(
    @Body() createTaskDto: CreateTaskDto,
    @TokenPayloadParam() payload: PayloadDto,
  ) {
    return this.taskService.create(createTaskDto, payload);
  }

  /**
   * Endpoint para buscar todas as tarefas do usuário autenticado.
   * GET /task
   * @param payload Payload do token JWT
   * @returns Lista de tarefas do usuário
   */
  @Get()
  @ApiOperation({
    summary: 'Listar tarefas do usuário',
    description: 'Retorna todas as tarefas do usuário autenticado',
  })
  @ApiCreatedResponse({
    description: 'Lista de tarefas retornada com sucesso',
    type: [ResponseTaskDto],
  })
  findAll(@TokenPayloadParam() payload: PayloadDto) {
    return this.taskService.findAll(payload);
  }

  /**
   * Endpoint para buscar uma tarefa específica por ID.
   * GET /task/:id
   * @param id ID da tarefa
   * @param payload Payload do token JWT
   * @returns Dados da tarefa
   */
  @Get(':id')
  findOne(@Param('id') id: string, @TokenPayloadParam() payload: PayloadDto) {
    return this.taskService.findOne(id, payload);
  }

  /**
   * Endpoint para buscar tarefas filtradas por status.
   * GET /task/status/:status
   * @param status Status das tarefas (PENDING, IN_PROGRESS, COMPLETED)
   * @param payload Payload do token JWT
   * @returns Lista de tarefas com o status especificado
   */
  @Get('status/:status')
  findTasksForStatus(
    @Param('status') status: taskStatus,
    @TokenPayloadParam() payload: PayloadDto,
  ) {
    return this.taskService.findTasksForStatus(status, payload);
  }

  /**
   * Endpoint para atualizar dados de uma tarefa.
   * PATCH /task/:id
   * @param id ID da tarefa
   * @param updateTaskDto Dados para atualização
   * @param payload Payload do token JWT
   * @returns Tarefa atualizada
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @TokenPayloadParam() payload: PayloadDto,
  ) {
    return this.taskService.update(id, updateTaskDto, payload);
  }

  /**
   * Endpoint para remover uma tarefa.
   * DELETE /task/:id
   * @param id ID da tarefa
   * @param payload Payload do token JWT
   * @returns Confirmação da remoção
   */
  @Delete(':id')
  remove(@Param('id') id: string, @TokenPayloadParam() payload: PayloadDto) {
    return this.taskService.remove(id, payload);
  }
}
