import { Server } from "./Server";
import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

export class App {
  server?: Server;

  async start(): Promise<void> {
    const port = process.env.PORT ?? "3000";
    const mode = process.env.NODE_ENV ?? "development";
    const appName = process.env.APP_NAME ?? "Backend";

    await this.verifyEnvVariables();

    this.server = new Server(port, mode, appName);

    return this.server.listen();
  }

  get httpServer(): Server["httpServer"] | undefined {
    return this.server?.getHTTPServer();
  }

  async stop(): Promise<void> {
    return this.server?.stop();
  }

  private async verifyEnvVariables() {
    const requiredEnvVars: [string?] = [];

    requiredEnvVars.forEach((x) => {
      if (!x) return;

      if (process.env[x] === "undefined" || process.env[x] === null) {
        throw new Error(`Env Variable ${x} is null`);
      }
    });
  }
}
