import {
  IsISO8601,
  IsIn,
  IsInt,
  IsOptional,
  ValidateNested,
} from 'class-validator';

import { OperationType } from '@core/enums/operation-type.enum';
import { Transform } from 'class-transformer';

export class OperationFilterDto {
  @IsOptional()
  @IsIn(Object.values(OperationType))
  readonly type?: OperationType;

  @IsOptional()
  @IsInt()
  readonly categoryId?: number;

  @IsOptional()
  @IsInt()
  readonly savingId?: number;

  @IsOptional()
  @IsISO8601()
  readonly dateFrom?: Date;

  @IsOptional()
  @IsISO8601()
  readonly dateTo?: Date;
}

export class FindOperationsDto {
  // @IsInt()
  @Transform(({ value }) => Number(value))
  readonly page: number;

  // @IsInt()
  @Transform(({ value }) => Number(value))
  readonly limit: number;

  @ValidateNested()
  @Transform(({ value }) => JSON.parse(value))
  readonly filter: OperationFilterDto;
}
