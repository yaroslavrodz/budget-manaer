import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { INTEGER, STRING } from 'sequelize';

import { User } from '@users/user.model';
import { Operation } from '@operations/operation.model';

export type CategoryAttrs = {
  id: number;
  name: string;
  userId: number;
};

export type CategoryCreationAttrs = Omit<CategoryAttrs, 'id'>;

@Table({ tableName: 'categories', timestamps: false })
export class Category extends Model<CategoryAttrs, CategoryCreationAttrs> {
  @Column({
    type: INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: STRING, unique: true, allowNull: false })
  name: string;

  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Operation)
  operations: Operation[];
}
