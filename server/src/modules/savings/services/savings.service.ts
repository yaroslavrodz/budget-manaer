import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions, WhereOptions, Op } from 'sequelize';

import {
  Saving,
  SavingAttrs,
  SavingCreationAttrs,
} from '@savings/saving.model';
import { OperationsService } from '@operations/operations.service';
import { FindSavingsDto } from '@savings/dto';

@Injectable()
export class SavingsService {
  constructor(
    @InjectModel(Saving) private savingRepository: typeof Saving,
    private operationsService: OperationsService,
  ) {}

  async findAll(userId: number, dto: FindSavingsDto) {
    const { page, limit, type } = dto;
    const offset = page * limit - limit;

    const whereOptions: WhereOptions<Saving> = {
      userId,
    };
    if (type) {
      whereOptions.type = type;
    }

    const findOptions: FindOptions<Saving> = {
      limit,
      offset,
      where: whereOptions,
    };

    return await this.savingRepository.findAndCountAll(findOptions);
  }

  async create(creationAttrs: SavingCreationAttrs) {
    const candidate = await this.savingRepository.findOne({
      where: {
        name: creationAttrs.name,
        userId: creationAttrs.userId,
      },
    });
    if (candidate) {
      throw new HttpException(
        'Saving with same name already exists',
        HttpStatus.CONFLICT,
      );
    }
    return await this.savingRepository.create(creationAttrs);
  }

  async update(updateAttrs: SavingAttrs) {
    const saving = await this.findById(updateAttrs.id);
    if (!saving) {
      throw new HttpException('Saving not found', HttpStatus.NOT_FOUND);
    }

    const candidate = await this.savingRepository.findOne({
      where: {
        id: { [Op.not]: saving.id },
        name: updateAttrs.name,
        userId: updateAttrs.userId,
      },
    });
    if (candidate) {
      throw new HttpException(
        'Saving with same name already exists',
        HttpStatus.CONFLICT,
      );
    }

    saving.set(updateAttrs);
    return await saving.save();
  }

  async delete(id: number) {
    const saving = await this.findById(id);
    if (!saving) {
      throw new HttpException('Saving not found', HttpStatus.NOT_FOUND);
    }

    const operation = await this.operationsService.findBySaving(id);
    if (operation) {
      throw new HttpException(
        "Can't delete. There are operations associated to this saving",
        HttpStatus.CONFLICT,
      );
    }

    await saving.destroy();
    return true;
  }

  async getBalance(userId: number) {
    const sum = await this.savingRepository.sum('amount', {
      where: { userId },
    });
    return sum ? sum : 0;
  }

  async findById(id: number) {
    return await this.savingRepository.findOne({
      where: { id },
    });
  }
}
