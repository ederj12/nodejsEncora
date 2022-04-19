import express, { Router, Request, Response, NextFunction } from "express";
import { getPool } from "../utils/workerPool";
import { logger, validSources, ValidData } from "../config/constants";
const router: Router = express.Router();
const ipRx: RegExp = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;
const domainRx: RegExp = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/;

function validateData(lookup: string, sources: string): ValidData {
  logger.info(`validateData lookup: ${lookup} sources: ${sources}`);
  
  const validData: ValidData = {
    isIp: false,
    isDomain: false,
    validSrc: validSources,
  };

  if (ipRx.test(lookup))
    validData.isIp = true;

  if (domainRx.test(lookup))
    validData.isDomain = true;

  if(!validData.isIp && !validData.isDomain)
    throw `The lookup format or value ${lookup} is invalid. It has to be an IP or Domain name`;

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
    const lookup: string = req.query.lookup as string;

    const validatedData: ValidData = validateData(lookup, sources);

    const workerPool = getPool();
    
    const result = await workerPool.run({validatedData, lookup});
    
    return res.status(200).json(result);

  } catch (e: any) {
    logger.error(e.stack || e);
    res.status(400).json({ message: e });
  }
});

export default router;
