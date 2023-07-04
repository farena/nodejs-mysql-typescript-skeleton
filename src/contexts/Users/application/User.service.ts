import { PaginatorParameters } from "../../../app/Shared/Paginator";
import { IUserRepository } from "../domain/IUserRepository";
import { UserEntity } from "../domain/UserEntity";
import { Validate } from "../../../app/Shared/Validator";
import { IUserService } from "../domain/IUserService";
import { UserDTO } from "../domain/UserDTO";
import { CustomError } from "../../../app/Exceptions/CustomError";

export class UserService implements IUserService {
  userRepo: IUserRepository;

  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo;
  }

  async getUsersPaginableList(params: PaginatorParameters) {
    const users = await this.userRepo.findAndCountAll(params);

    return {
      rows: users.rows.map((x) => new UserDTO(x)),
      count: users.count,
    };
  }

  async createUser(userData: any) {
    await Validate(userData, {
      first_name: "required",
      last_name: "required",
      email: "required|email",
      password: "required|confirmed|min:6",
    });

    const userEntity = new UserEntity(userData);
    const user = await this.userRepo.create(userEntity);

    return new UserDTO(user);
  }

  async showUser(user_id: number | string) {
    const user = await this.userRepo.findByPk(user_id as number);

    return new UserDTO(user);
  }

  async updateUser(user_id: number | string, newUserData: any) {
    const user = await this.userRepo.findByPk(user_id as number);

    await Validate(newUserData, {
      first_name: "required",
      last_name: "required",
      email: "required|email",
      password: "required",
      new_password: "required|confirmed|min:6",
    });

    console.log(user.checkPassword(newUserData.password));

    if (!user.checkPassword(newUserData.password)) {
      throw new CustomError("Password is wrong", 412);
    }

    await this.userRepo.update(user, {
      ...newUserData,
      password: newUserData.new_password,
    });

    return new UserDTO(newUserData);
  }

  async removeUser(user_id: number | string) {
    const user = await this.userRepo.findByPk(user_id as number);

    await this.userRepo.destroy(user);

    return new UserDTO(user);
  }
}
