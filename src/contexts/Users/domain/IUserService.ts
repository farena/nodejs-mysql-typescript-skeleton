import {
  IPaginableQueryResult,
  PaginatorParameters,
} from "../../../app/Shared/Paginator";
import { IUserRepository } from "./IUserRepository";
import { UserDTO } from "./UserDTO";

export interface IUserService {
  userRepo: IUserRepository;

  getUsersPaginableList(
    params: PaginatorParameters
  ): Promise<IPaginableQueryResult<UserDTO>>;

  createUser(userData: any): Promise<UserDTO>;

  showUser(user_id: number | string): Promise<UserDTO>;

  updateUser(user_id: number | string, newUserData: any): Promise<UserDTO>;

  removeUser(user_id: number | string): Promise<UserDTO>;
}
