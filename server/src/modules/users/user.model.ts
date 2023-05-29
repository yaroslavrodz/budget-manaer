import {
  Column,
  DefaultScope,
  Model,
  Scopes,
  Table,
} from 'sequelize-typescript';
import { INTEGER, STRING } from 'sequelize';

export type UserAttrs = {
  id: number;
  email: string;
  username: string;
  password: string;
};

export type UserCreationAttrs = Omit<UserAttrs, 'id'>;

@DefaultScope(() => ({
  attributes: {
    exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'],
  },
}))
@Scopes(() => ({
  login: {
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'deletedAt'],
    },
  },
}))
@Table({ tableName: 'users', timestamps: true, paranoid: true })
export class User extends Model<UserAttrs, UserCreationAttrs> {
  @Column({
    type: INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: STRING, unique: true, allowNull: false })
  username: string;

  @Column({ type: STRING, allowNull: false })
  password: string;
}
