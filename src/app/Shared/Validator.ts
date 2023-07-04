import Validator from "validatorjs";
import { CustomError } from "../Exceptions/CustomError";

export async function Validate(data: any, rules: any, messages?: any) {
  const validation = new Validator(data, rules, messages);

  if (validation.fails()) {
    throw new CustomError("Something went wrong", 412, validation.errors.all());
  }
}
