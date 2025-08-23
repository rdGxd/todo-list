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
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthAndPolicyGuard)
  @SetRoutePolicy(Roles.USER)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @TokenPayloadParam() payload: PayloadDto) {
    return this.usersService.findOne(id, payload);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
