import axios from "axios";
import { logger } from "../config/constants";
import { sourceConfig } from "../config/constants";

export async function rdap({ lookup, isDomain }:{lookup: string, isDomain: boolean}) {
    try {
        logger.info(`worker rdap`);

        const options: sourceConfig = {
            id: process.env.RDAP as string,
            url: `https://www.rdap.net/${isDomain ? "domain" : "ip"}/${lookup}`,
          };
          
          const result = await axios.get(
            options.url,
            options.options ? options.options : undefined
          );  
        
          return { service: process.env.RDAP, data: result.data };
        
    } catch (error:any) {
        return {service: process.env.RDAP, status: error.response.status, message: error.response.statusText}
       
    }
  
}

export async function virusTotal({ lookup, isDomain }:{lookup: string, isDomain: boolean}) {
  try {
    logger.info(`worker virusTotal`);
    
    const options: sourceConfig = {
        id: process.env.VIRUSTOTAL as string,
        url: `https://www.virustotal.com/api/v3/${isDomain ? "domains" : "ip_addresses"}/${lookup}`,
        options: {
          headers: {
            "x-apikey": process.env.VIRUSTOTALKEY,
          },
        },
      };
    
      const result = await axios.get(
        options.url,
        options.options ? options.options : undefined
      );
    
      return { service: process.env.VIRUSTOTAL, data: result.data };
  } catch (error:any) {
    return {service: process.env.RDAP, status: error.response.status, message: error.response.statusText}
  }
}
