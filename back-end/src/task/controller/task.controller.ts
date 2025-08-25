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
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskService } from '../service/task.service';

@UseGuards(AuthAndPolicyGuard)
@SetRoutePolicy(Roles.USER || Roles.ADMIN)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @TokenPayloadParam() payload: PayloadDto,
  ) {
    return this.taskService.create(createTaskDto, payload);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
