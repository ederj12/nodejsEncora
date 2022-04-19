import { logger, ValidData, RDAP, VIRUSTOTAL } from "../config/constants";
import { getPool } from "../workers/workerPool";

const handleRequest = async (validatedData: ValidData, lookup: string) => {
  logger.info(`handleRequest`);

  const pool = getPool();
  const promises: Array<any> = [];

  validatedData.validSrc.forEach((source) => {
    if (source == RDAP)
      promises.push(
        pool.run(
          { lookup, isDomain: validatedData.isDomain }, 
          { name: "rdap" }
          )
      );
    if (source == VIRUSTOTAL)
      promises.push(
        pool.run(
          { lookup, isDomain: validatedData.isDomain },
          { name: "virusTotal" }
        )
      );
  });

  const result: any = await Promise.allSettled(promises);

  const mapResult = result.map((response: any) => {
    const { service, status, message, data } = response.value;
    return { service, status, message, data };
  });

  const lookupResult = { lookup, lookupInfo: mapResult };

  return lookupResult;
};

export default handleRequest;
