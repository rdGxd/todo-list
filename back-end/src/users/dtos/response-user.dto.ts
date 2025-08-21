import { Expose } from 'class-transformer';

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
}
