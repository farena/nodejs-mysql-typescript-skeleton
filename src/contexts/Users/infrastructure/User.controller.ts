import { BaseController } from "../../../app/Shared/BaseController";
import { NextFunction, Request, Response } from "express";
import { UserService } from "../application/User.service";
import { PaginatorParameters } from "../../../app/Shared/Paginator";

export class UserController extends BaseController {
  public userService: UserService;

  constructor(userService: UserService) {
    super();
    this.userService = userService;
  }

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const params = new PaginatorParameters(req.query);
      const result = await this.userService.getUsersPaginableList(params);

      res.status(200).send(this.apiPaginatedResponse(result, params));
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.userService.createUser(req.body);

      res.status(200).send(this.apiResponse(result));
    } catch (error) {
      next(error);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id } = req.params;
      const result = await this.userService.showUser(user_id);

      res.status(200).send(this.apiResponse(result));
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id } = req.params;
      const result = await this.userService.updateUser(user_id, req.body);

      res.status(200).send(this.apiResponse(result));
    } catch (error) {
      next(error);
    }
  }

  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id } = req.params;

      const result = await this.userService.removeUser(user_id);

      res.status(200).send(this.apiResponse(result));
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await this.userService.login(email, password);

      res.status(200).send(this.apiResponse(result));
    } catch (error) {
      next(error);
    }
  }
}
