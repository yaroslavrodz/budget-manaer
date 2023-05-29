import { IsIn, IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

import { SavingType } from '@core/enums/saving-type.enum';

export class FindSavingsDto {
  @IsInt()
  @Transform(({ value }) => Number(value))
  readonly page: number;

  @IsInt()
  @Transform(({ value }) => Number(value))
  readonly limit: number;

  @IsOptional()
  @IsIn(Object.values(SavingType))
  readonly type?: SavingType;
}
