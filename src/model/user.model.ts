import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

import Friend from "./friend.model";

@Table
export default class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: bigint;

  @AllowNull(false)
  @Column(DataType.STRING(20))
  phone: string;

  @AllowNull(false)
  @Column(DataType.STRING(20))
  name: string;

  @Default("")
  @Column(DataType.STRING(100))
  statusMessage: string;

  @HasMany(() => Friend)
  myfriends: User[];
}
