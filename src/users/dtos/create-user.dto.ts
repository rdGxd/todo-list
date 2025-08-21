import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(3, 50)
  @IsNotEmpty()
  name: string;

  @IsString()
  @Length(6, 20)
  @IsNotEmpty()
  password: string;
}
