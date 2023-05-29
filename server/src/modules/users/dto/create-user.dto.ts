import { IsEmail, IsString, Length } from 'class-validator';

import { UserCreationAttrs } from '@users/user.model';

export class CreateUserDto implements UserCreationAttrs {
  @IsEmail()
  readonly email: string;

  @IsString()
  @Length(4, 32)
  readonly username: string;

  @IsString()
  @Length(4, 32)
  readonly password: string;
}
