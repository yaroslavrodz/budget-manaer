import { IsIn, IsNumber, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

import { SavingCreationAttrs } from '@savings/saving.model';
import { SavingType } from '@core/enums/saving-type.enum';

export class CreateSavingDto implements Omit<SavingCreationAttrs, 'userId'> {
  @IsString()
  @Length(2, 32)
  readonly name: string;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  readonly amount: number;

  @IsIn(Object.values(SavingType))
  readonly type: SavingType;
}
