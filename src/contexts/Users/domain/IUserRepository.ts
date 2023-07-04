import {
  IPaginableQueryResult,
  PaginatorParameters,
} from "../../../app/Shared/Paginator";
import UserModel from "../../../app/Models/user.model";
import { Transaction, WhereOptions } from "sequelize";
import { UserEntity } from "./UserEntity";

export interface IUserRepository {
  findAndCountAll(
    params: PaginatorParameters,
    where?: WhereOptions
  ): Promise<IPaginableQueryResult<UserModel>>;

  findAll(): Promise<UserModel[]>;

  findByPk(user_id: number): Promise<UserModel>;

  findByEmail(email: string): Promise<UserModel>;

  create(user: UserEntity, transaction?: Transaction): Promise<UserModel>;

  update(
    user: UserModel,
    data: UserEntity,
    transaction?: Transaction
  ): Promise<UserModel>;

  destroy(user: UserModel, transaction?: Transaction): Promise<UserModel>;
}
