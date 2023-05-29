import { IsInt, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

import { CategoryAttrs } from '@categories/category.model';

export class UpdateCategoryDto implements CategoryAttrs {
  @IsInt()
  @Transform(({ value }) => Number(value))
  readonly id: number;

  @IsString()
  @Length(2, 32)
  readonly name: string;

  @IsInt()
  @Transform(({ value }) => Number(value))
  readonly userId: number;
}
