import { IsEnum, IsString } from 'class-validator';
import { taskStatus } from '../enums/taskStatus';

export class ResponseTaskDto {
  @IsString()
  taskId: string;
  @IsString()
  userId: string;
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsEnum(taskStatus)
  status: taskStatus;
  @IsString()
  createdAt: string;
  @IsString()
  updatedAt: string;
}
