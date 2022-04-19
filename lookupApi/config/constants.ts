import { createLogger, transports, format } from "winston";

export const RDAP: string = "RDAP";
export const VIRUSTOTAL: string = "VIRUSTOTAL";

export const validSources: Array<string> = [RDAP, VIRUSTOTAL];

export type ValidData = {
  isIp: boolean;
  isDomain: boolean;
  validSrc: Array<string>;
};

export const logger = createLogger({
    transports: [new transports.Console()],
    format: format.combine(
      format.colorize(),
      format.timestamp(),
      format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] ${level}: ${message}`;
      })
    ),
  });