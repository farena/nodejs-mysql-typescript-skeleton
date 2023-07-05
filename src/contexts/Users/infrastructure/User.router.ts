import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./User.controller";
import AuthMiddleware from "../../../app/Middlewares/auth.middleware";

export class UserRouter {
  userController: UserController;

  constructor(userController: UserController) {
    this.userController = userController;
  }

  register(router: Router): void {
    router.get(
      "/users",
      [AuthMiddleware],
      (req: Request, res: Response, next: NextFunction) =>
        this.userController.index(req, res, next)
    );

    router.post(
      "/users",
      [AuthMiddleware],
      (req: Request, res: Response, next: NextFunction) =>
        this.userController.create(req, res, next)
    );

    router.get(
      "/users/:user_id",
      [AuthMiddleware],
      (req: Request, res: Response, next: NextFunction) =>
        this.userController.show(req, res, next)
    );

    router.put(
      "/users/:user_id",
      [AuthMiddleware],
      (req: Request, res: Response, next: NextFunction) =>
        this.userController.update(req, res, next)
    );

    router.delete(
      "/users/:user_id",
      [AuthMiddleware],
      (req: Request, res: Response, next: NextFunction) =>
        this.userController.destroy(req, res, next)
    );

    router.post("/login", (req: Request, res: Response, next: NextFunction) =>
      this.userController.login(req, res, next)
    );
  }
}
