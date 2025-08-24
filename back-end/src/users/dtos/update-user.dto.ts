import { PartialType } from '@nestjs/mapped-types';
import { ArrayNotEmpty, IsArray, IsEnum, IsOptional } from 'class-validator';
import { Roles } from 'src/auth/enums/roles';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Roles, { each: true })
  @IsOptional()
  roles?: Roles[];
}
