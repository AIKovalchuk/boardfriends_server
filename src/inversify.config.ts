import { PrismaClient } from "@prisma/client";
import { Container } from "inversify";
import { ILoggerService } from "./service/interfaces/ILoggerService";
import { IUserService } from "./service/interfaces/IUserService";
import { LoggerService } from "./service/logger";
import { TYPES } from "./service/types";
import { UserService } from "./service/user";

const container = new Container();

container.bind<PrismaClient>(TYPES.Prisma).toConstantValue(new PrismaClient());

container.bind<ILoggerService>(TYPES.LoggerService).to(LoggerService);
container.bind<IUserService>(TYPES.LoggerService).to(UserService);

export { container };
