import { INTEGER, STRING, FLOAT, ENUM } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { OperationType } from '@core/enums/operation-type.enum';
import { Category } from '@categories/category.model';
import { Saving } from '@savings/saving.model';
import { User } from '@users/user.model';

export type OperationAttrs = {
  id: number;
  name: string;
  amount: number;
  type: OperationType;
  categoryId: number;
  savingId: number;
  userId: number;
  createdAt: Date;
};

export type OperationCreationAttrs = Omit<OperationAttrs, 'id' | 'createdAt'>;

@Table({ tableName: 'operations', timestamps: true })
export class Operation extends Model<OperationAttrs, OperationCreationAttrs> {
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

  @Column({ type: ENUM(...Object.values(OperationType)), allowNull: false })
  type: string;

  @ForeignKey(() => Category)
  @Column({ type: INTEGER, allowNull: false })
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @ForeignKey(() => Saving)
  @Column({ type: INTEGER, allowNull: false })
  savingId: number;

  @BelongsTo(() => Saving)
  saving: Saving;

  @ForeignKey(() => User)
  @Column({ type: INTEGER, allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
