import { Router } from "express";
import { UserService } from "../application/User.service";
import { UserRepository } from "./User.repository";
import { UserController } from "./User.controller";
import { UserRouter } from "./User.router";

const userRepo = new UserRepository();
const userService = new UserService(userRepo);
const userController = new UserController(userService);
const userRouter = new UserRouter(userController);

export function register(router: Router): void {
  userRouter.register(router);
}
