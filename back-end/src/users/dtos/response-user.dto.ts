import { Expose } from 'class-transformer';
import { Role } from 'src/auth/enums/roles';

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
  roles: Role[];
}
