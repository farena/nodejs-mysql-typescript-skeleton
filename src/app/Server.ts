import express, { Router } from "express";
import { json, urlencoded } from "body-parser";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import db from "./Config/db.config"
import registerRoutes from "./RouteRegister";

import * as http from "http";

export class Server {
  private readonly express: express.Express;
  private readonly mode: string;
  private readonly port: string;
  private readonly appName: string;
  private httpServer?: http.Server;

  constructor(port: string, mode: string, appName: string) {
    this.port = port;
    this.mode = mode;
    this.appName = appName;
    this.express = express();

    if (mode !== "test") {
      this.express.use(morgan("dev"));
    }
    this.express.use(json());
    this.express.use(urlencoded({ extended: true }));
    this.express.use(helmet.xssFilter());
    this.express.use(helmet.noSniff());
    this.express.use(helmet.hidePoweredBy());
    this.express.use(helmet.frameguard({ action: "deny" }));
    this.express.use(compression());

    this.testDBConnection();

    const router = Router();
    this.express.use(router);
    registerRoutes(router);
  }

  async listen(): Promise<void> {
    return new Promise((resolve) => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(
          `${this.appName} App is running at http://localhost:${this.port} in ${this.mode} mode`
        );
        console.log("  Press CTRL-C to stop\n");
        resolve();
      });
    });
  }

  getHTTPServer(): Server["httpServer"] {
    return this.httpServer;
  }

	testDBConnection() { 
		db.authenticate().then(() => {
			console.log('Connected to DB');
		})
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
          if (error) {
            reject(error);

            return;
          }

          resolve();
        });
      }

      resolve();
    });
  }
}
