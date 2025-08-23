import { Expose } from 'class-transformer';
import { Roles } from 'src/auth/enums/roles';

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
}
