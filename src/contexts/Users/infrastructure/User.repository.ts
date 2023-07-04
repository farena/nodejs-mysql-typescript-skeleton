import { Transaction, WhereOptions } from "sequelize";
import { UserEntity } from "../domain/UserEntity";
import { IUserRepository } from "../domain/IUserRepository";
import { CustomError } from "../../../app/Exceptions/CustomError";
import UserModel from "../../../app/Models/user.model";
import {
  PaginatorParameters,
  createPaginableQuery,
} from "../../../app/Shared/Paginator";

export class UserRepository implements IUserRepository {
  async findAndCountAll(params: PaginatorParameters, where?: WhereOptions) {
    const users = await UserModel.findAndCountAll(
      createPaginableQuery({ where }, params)
    );

    return users;
  }

  async findAll(where?: WhereOptions) {
    const users = await UserModel.findAll({
      where,
    });

    return users;
  }

  async findByPk(user_id: number) {
    const user = await UserModel.findByPk(user_id);

    if (!user) throw new CustomError("User not found", 404);

    return user;
  }

  async findByEmail(email: string) {
    const user = await UserModel.findOne({
      where: { email },
    });

    if (!user) throw new CustomError("User not found", 404);

    return user;
  }

  async create(data: UserEntity, transaction?: Transaction) {
    const user = await UserModel.create({ ...data }, { transaction });

    return user;
  }

  async update(user: UserModel, data: UserEntity, transaction?: Transaction) {
    const userRes = await user.update({ ...data }, { transaction });

    return userRes;
  }

  async destroy(user: UserModel, transaction?: Transaction) {
    await user.destroy({
      transaction,
    });

    return user;
  }
}
