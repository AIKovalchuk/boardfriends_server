import { injectable } from "inversify";
import { ILoggerService } from "./interfaces/ILoggerService";

@injectable()
export class LoggerService implements ILoggerService {
    public info = async (test: string) => {};

    public error = async (test: string) => {};
}
