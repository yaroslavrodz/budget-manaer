import { IsString, Length } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  readonly currentPassword: string;

  @IsString()
  @Length(4, 32)
  readonly newPassword: string;
}
