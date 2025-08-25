import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { taskStatus } from '../enums/taskStatus';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  @IsEnum(taskStatus)
  status: any;
}
