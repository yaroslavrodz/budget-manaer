import { WhereOptions, Op } from 'sequelize';

import { OperationAttrs } from '@operations/operation.model';
import { OperationFilterDto } from '@operations/dto';

export function buildFilter(
  userId: number,
  filter: OperationFilterDto,
): WhereOptions<OperationAttrs> {
  const { type, categoryId, savingId, dateFrom, dateTo } = filter;
  const whereOptions: WhereOptions<OperationAttrs> = { userId };

  if (type) {
    whereOptions.type = type;
  }
  if (savingId) {
    whereOptions.savingId = savingId;
  }
  if (categoryId) {
    whereOptions.categoryId = categoryId;
  }

  if (dateFrom && dateTo === undefined) {
    whereOptions.createdAt = { [Op.gt]: dateFrom };
  } else if (dateFrom === undefined && dateTo) {
    whereOptions.createdAt = { [Op.lt]: dateTo };
  } else if (dateFrom && dateTo) {
    whereOptions.createdAt = {
      [Op.and]: [{ [Op.gt]: dateFrom }, { [Op.lt]: dateTo }],
    };
  }

  return whereOptions;
}
