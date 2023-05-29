import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions, Op } from 'sequelize';

import {
  Category,
  CategoryAttrs,
  CategoryCreationAttrs,
} from '@categories/category.model';
import { OperationsService } from '@operations/operations.service';
import { FindCategoriesDto } from '@categories/dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category,
    private operationsService: OperationsService,
  ) {}

  async findAll(userId: number, dto: FindCategoriesDto) {
    const { page, limit } = dto;
    const offset = page * limit - limit;

    const findOptions: FindOptions<Category> = {
      limit,
      offset,
      where: { userId },
    };

    return await this.categoryRepository.findAndCountAll(findOptions);
  }

  async create(creationAttrs: CategoryCreationAttrs) {
    const candidate = await this.categoryRepository.findOne({
      where: {
        name: creationAttrs.name,
        userId: creationAttrs.userId,
      },
    });
    if (candidate) {
      throw new HttpException(
        'Category with same name already exists',
        HttpStatus.CONFLICT,
      );
    }
    return await this.categoryRepository.create(creationAttrs);
  }

  async update(updateAttrs: CategoryAttrs) {
    const category = await this.findById(updateAttrs.id);
    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    const candidate = await this.categoryRepository.findOne({
      where: {
        id: { [Op.not]: category.id },
        name: updateAttrs.name,
        userId: updateAttrs.userId,
      },
    });
    if (candidate) {
      throw new HttpException(
        'Category with same name already exists',
        HttpStatus.CONFLICT,
      );
    }

    category.set(updateAttrs);
    return await category.save();
  }

  async delete(id: number) {
    const category = await this.findById(id);
    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    const operation = await this.operationsService.findByCategory(id);
    if (operation) {
      throw new HttpException(
        "Can't delete. There are operations associated to this category",
        HttpStatus.CONFLICT,
      );
    }

    await category.destroy();
    return true;
  }

  async findById(id: number) {
    return this.categoryRepository.findOne({
      where: { id },
    });
  }
}
