import { HttpException, HttpStatus } from '@nestjs/common';
import { STRING, INTEGER, FLOAT, ENUM } from 'sequelize';
import {
  BeforeCreate,
  BeforeUpdate,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

import { SavingType } from '@core/enums/saving-type.enum';
import { Operation } from '@operations/operation.model';
import { User } from '@users/user.model';

export type SavingAttrs = {
  id: number;
  name: string;
  amount: number;
  type: SavingType;
  userId: number;
};

export type SavingCreationAttrs = Omit<SavingAttrs, 'id'>;

@Table({ tableName: 'savings', timestamps: false })
export class Saving extends Model<Saving, SavingCreationAttrs> {
  @Column({
    type: INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: STRING, allowNull: false })
  name: string;

  @Column({ type: FLOAT, allowNull: false })
  amount: number;

  @Column({ type: ENUM(...Object.values(SavingType)), allowNull: false })
  type: SavingType;

  @ForeignKey(() => User)
  @Column({ type: INTEGER, allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Operation)
  operations: Operation[];

  @BeforeCreate
  @BeforeUpdate
  static checkIfNegative(instance: Saving) {
    if (instance.amount < 0) {
      throw new HttpException(
        "Saving amount can't be negative",
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
