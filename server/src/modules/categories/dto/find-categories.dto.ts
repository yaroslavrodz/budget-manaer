import { IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindCategoriesDto {
  @IsInt()
  @Transform(({ value }) => Number(value))
  readonly page: number;

  @IsInt()
  @Transform(({ value }) => Number(value))
  readonly limit: number;
}
