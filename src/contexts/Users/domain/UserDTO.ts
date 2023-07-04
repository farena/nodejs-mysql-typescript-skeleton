export class UserDTO {
  user_id?: number;
  first_name: string;
  last_name: string;
  fullname: string;
  email: string;

  constructor({
    user_id,
    first_name,
    last_name,
    email,
  }: {
    user_id?: number;
    first_name: string;
    last_name: string;
    email: string;
  }) {
    this.user_id = user_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.fullname = `${first_name} ${last_name}`;
    this.email = email;
  }
}
