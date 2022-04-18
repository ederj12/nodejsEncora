import express, { Router, Request, Response, NextFunction } from "express";
import { configIpSources, configDomainSources } from "../config/sourceConfig";
import { getInfo } from "../utils/getInfo";
import { get } from "../utils/workerPool";
import { logger, validSources } from "../config/constants";
const router: Router = express.Router();

type ValidData = {
  validIp: boolean;
  validDomain: boolean;
  validSrc: Array<string>;
};

function validateData(ip: string, domain: string, sources: string): ValidData {
  logger.info(`validateData ip: ${ip} domain: ${domain} sources: ${sources}`);
  let validData: ValidData = {
    validIp: false,
    validDomain: false,
    validSrc: validSources,
  };

  if (/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(ip))
    validData.validIp = true;

  if (
    /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/.test(
      domain
    )
  )
    validData.validDomain = true;

  if (typeof sources == "string") {
    const srcWithoutSpaces = sources.replace(/\s/g, "");
    const srcArray = srcWithoutSpaces.split(",");
    srcArray.forEach((element) => {
      if (!validSources.some((source) => source == element)) {
        throw `${element} is an invalid source`;
      }
    });
    validData.validSrc = srcArray;
  }

  return validData;
}

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info(`Get lookup`);
    const sources: string = req.query.services as string;
    const ip: string = req.query.ip as string;
    const domain: string = req.query.domain as string;
    let domainResult = {};
    let ipResult = {};

    const validatedData: ValidData = validateData(ip, domain, sources);

    if (validatedData.validDomain) {
      const domainServices = configDomainSources(
        domain,
        validatedData.validSrc
      );
      let workerPool: any;
      let domainInfo: unknown;

      if (process.env.WORKER_POOL_ENABLED === "1") {
        workerPool = get();
        domainInfo = await workerPool.getInfo(domain, domainServices);
      } else {
        domainInfo = await getInfo(domain, domainServices);
      }

      domainResult = {
        domain,
        domainInfo,
      };
    }

    if (validatedData.validIp) {
      const ipServices = configIpSources(ip, validatedData.validSrc);
      let workerPool: any;
      let ipInfo: unknown;

      if (process.env.WORKER_POOL_ENABLED === "1") {
        workerPool = get();
        ipInfo = await workerPool.getInfo(ip, ipServices);
      } else {
        ipInfo = await getInfo(ip, ipServices);
      }

      ipResult = {
        ip,
        ipInfo,
      };
    }

    return res.json({ ipResult, domainResult });
  } catch (e) {
    logger.error(e);
    res.status(400).json({ message: e });
  }
});

export default router;
