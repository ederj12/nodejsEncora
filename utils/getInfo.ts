import axios from "axios";
import workerPool from "workerpool";
import { logger } from "../config/constants";

export const getInfo = async (ipOrDomain: string, services: any) => {
  logger.info(`GetInfo for ${ipOrDomain}`);
  
  const result: any = await Promise.allSettled(
    services.map((service: any) =>
      axios.get(service.url, service.options ? service.options : undefined)
    )
  );

  const mapResponse = result.map((response: any) => {
    if (response.status == "fulfilled") {
      const { config, data } = response.value;
      return { url: config.url, data };
    } else {
      const { message, config } = response.reason;
      return { message, config };
    }
  });

  return mapResponse;
};

workerPool.worker({
  getInfo,
});
