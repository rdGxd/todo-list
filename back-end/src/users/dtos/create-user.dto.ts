import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Roles } from 'src/auth/enums/roles';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(3, 50)
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Roles, { each: true })
  @IsOptional()
  roles?: Roles[];

  @IsString()
  @Length(6, 20)
  @IsNotEmpty()
  password: string;
}
