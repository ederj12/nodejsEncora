
import path from "path";
import { logger } from "../config/constants";
import Piscina from 'piscina'; 

let pool: Piscina;

export const initPool = async ()=>{
  logger.info(`Init Pool`);
  
  pool =  await new Piscina({
    //name: 'handleRequest',
    filename: path.resolve(__dirname, './getInfo.js'),
    minThreads: 2,
    maxThreads: 2
  }); 

  logger.info(`Init Pool ${JSON.stringify(pool)}`)
}

export const getPool =()=>{
  logger.info(`Get Pool`)
  return pool;
}
