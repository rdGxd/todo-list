import { Expose } from 'class-transformer';
import { Roles } from 'src/auth/enums/roles';
import { ResponseTaskDto } from 'src/task/dto/response-task.dto';

export class ResponseUserDto {
  @Expose()
  id: string;
  @Expose()
  email: string;
  @Expose()
  name: string;
  @Expose()
  createdAt: string;
  @Expose()
  updatedAt: string;

  @Expose()
  roles: Roles[];

  @Expose()
  tasks: ResponseTaskDto[];
}
