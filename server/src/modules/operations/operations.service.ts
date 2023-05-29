import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { Sequelize, FindOptions } from 'sequelize';

import {
  Operation,
  OperationAttrs,
  OperationCreationAttrs,
} from '@operations/operation.model';
import { Saving } from '@savings/saving.model';
import { Category } from '@categories/category.model';
import { OperationSavingService } from '@savings/services/operation-saving.service';
import { FindOperationsDto } from '@operations/dto/find-operations.dto';
import { buildFilter } from '@operations/helpers/build-filter.helper';

@Injectable()
export class OperationsService {
  constructor(
    @InjectConnection() private sequelize: Sequelize,
    @InjectModel(Operation) private operationRepository: typeof Operation,
    private operationSavingService: OperationSavingService,
  ) {}

  async findAll(userId: number, dto: FindOperationsDto) {
    const { page, limit } = dto;
    const offset = page * limit - limit;

    const where = buildFilter(userId, dto.filter);
    const findOptions: FindOptions<OperationAttrs> = {
      limit,
      offset,
      include: [
        { model: Category, attributes: ['id', 'name'] },
        { model: Saving, attributes: ['id', 'name'] },
      ],
      where,
      order: [['createdAt', 'DESC']],
    };

    return await this.operationRepository.findAndCountAll(findOptions);
  }

  async create(creationAttrs: OperationCreationAttrs) {
    return await this.sequelize.transaction(async (transaction) => {
      const operation = await this.operationRepository.create(creationAttrs, {
        transaction,
      });

      await this.operationSavingService.onOperationCreate(
        operation,
        transaction,
      );

      return operation;
    });
  }

  async update(updateAttrs: Omit<OperationAttrs, 'createdAt'>) {
    return await this.sequelize.transaction(async (transaction) => {
      const operation = await this.findById(updateAttrs.id);
      if (!operation) {
        throw new HttpException('Operation not found', HttpStatus.NOT_FOUND);
      }

      const operationBefore = operation.toJSON() as Operation;

      operation.set(updateAttrs);
      await operation.save({ transaction });

      await this.operationSavingService.onOperationUpdate(
        operationBefore,
        operation,
        transaction,
      );

      return operation;
    });
  }

  async delete(id: number) {
    return await this.sequelize.transaction(async (transaction) => {
      const operation = await this.findById(id);
      if (!operation) {
        throw new HttpException('Operation not found', HttpStatus.NOT_FOUND);
      }

      await this.operationSavingService.onOperationDelete(
        operation,
        transaction,
      );

      await operation.destroy({ transaction });
      return true;
    });
  }

  async findById(id: number) {
    return await this.operationRepository.findOne({
      where: { id },
    });
  }

  async findBySaving(savingId: number) {
    return await this.operationRepository.findOne({
      where: { savingId },
    });
  }

  async findByCategory(categoryId: number) {
    return await this.operationRepository.findOne({
      where: { categoryId },
    });
  }
}
