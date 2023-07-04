import { CustomError } from "../../../app/Exceptions/CustomError";
import bcrypt from "bcrypt";
import { UserDTO } from "./UserDTO";

export class UserEntity {
  user_id?: number;
  first_name: string;
  last_name: string;
  fullname: string;
  email: string;
  password: string;

  constructor({
    user_id,
    first_name,
    last_name,
    email,
    password,
  }: {
    user_id?: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }) {
    this.user_id = user_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.fullname = `${first_name} ${last_name}`;
    this.email = email;
    this.password = password;
  }

  get persisted(): boolean {
    return this.user_id !== null;
  }

  toDTO() {
    return new UserDTO({
      user_id: this.user_id,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
    });
  }
}
