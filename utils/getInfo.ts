import axios from "axios";
import { logger, ValidData } from "../config/constants";
import { configIpSources, configDomainSources } from "../config/sourceConfig";


const getInfo = async (ipOrDomain: string, services: any) => {
  logger.info(`GetInfo for ${ipOrDomain}`);

  const promises = services.map((service: any) =>
    axios.get(service.url, service.options ? service.options : undefined)
  );

  const result: any = await Promise.allSettled(promises);

  const mapResponse = result.map((response: any) => {
    //success
    if (response.status == "fulfilled") {
      const { config, data } = response.value;
      return { url: config.url, data };
    } else {
      //error
      const { message, config } = response.reason;
      return { message, config };
    }
  });

  return mapResponse;
};

const handleRequest = async({validatedData, lookup}:{validatedData: ValidData, lookup: string})=>{
  
  let sources = {};

  if (validatedData.isDomain) {
    sources = configDomainSources(lookup,validatedData.validSrc);
  }

  if (validatedData.isIp) {
    sources = configIpSources(lookup, validatedData.validSrc);
  }

  const lookupInfo = await getInfo(lookup, sources);

  const lookupResult = { lookup, lookupInfo };

  return lookupResult;
}

export default handleRequest;
