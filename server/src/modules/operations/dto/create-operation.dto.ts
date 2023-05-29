import { IsIn, IsInt, IsNumber, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

import { OperationCreationAttrs } from '@operations/operation.model';
import { OperationType } from '@core/enums/operation-type.enum';

export class CreateOperationDto
  implements Omit<OperationCreationAttrs, 'userId'>
{
  @IsString()
  @Length(2, 64)
  readonly name: string;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  readonly amount: number;

  @IsIn(Object.values(OperationType))
  readonly type: OperationType;

  @IsInt()
  @Transform(({ value }) => Number(value))
  readonly categoryId: number;

  @IsInt()
  @Transform(({ value }) => Number(value))
  readonly savingId: number;
}
