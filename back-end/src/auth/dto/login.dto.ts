import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
