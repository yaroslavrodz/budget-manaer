import { IsIn, IsInt, IsNumber, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

import { SavingAttrs } from '@savings/saving.model';
import { SavingType } from '@core/enums/saving-type.enum';

export class UpdateSavingDto implements SavingAttrs {
  @IsInt()
  @Transform(({ value }) => Number(value))
  readonly id: number;

  @IsString()
  @Length(2, 32)
  readonly name: string;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  readonly amount: number;

  @IsIn(Object.values(SavingType))
  readonly type: SavingType;

  @IsInt()
  @Transform(({ value }) => Number(value))
  readonly userId: number;
}
