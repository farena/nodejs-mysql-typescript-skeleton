import { DataType, Table, Column, Model, Scopes } from "sequelize-typescript";
import bcrypt from "bcrypt";
import { CustomError } from "../Exceptions/CustomError";

const { STRING, INTEGER, VIRTUAL } = DataType;

@Scopes(() => ({
  noPassword: {
    attributes: { exclude: ["password"] },
  },
}))
@Table({
  modelName: "user",
  tableName: "user",
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export default class UserModel extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  })
  user_id!: number;

  @Column({
    type: STRING,
  })
  first_name!: string;

  @Column({
    type: STRING,
  })
  last_name!: string;

  @Column(VIRTUAL)
  get fullname(): string {
    return `${this.first_name} ${this.last_name}`;
  }

  @Column({
    type: STRING,
  })
  email!: string;

  @Column({
    type: STRING,
    set(this: UserModel, value: string) {
      if (value !== this.password) {
        this.setDataValue("password", bcrypt.hashSync(value, 10));
      }
    },
  })
  password!: string;

  checkPassword(password: string): boolean {
    if (!this.password) throw new CustomError("User has no password", 412);

    return bcrypt.compareSync(password, this.password);
  }
}
