
import path from "path";
import { logger } from "../config/constants";
import Piscina from 'piscina'; 

let pool: Piscina;

export const initPool = async ()=>{
  logger.info(`Init Pool`);
  
  pool =  await new Piscina({
    filename: path.resolve(__dirname, '../services/services.js'),
    minThreads: 2,
    maxThreads: 2
  }); 
}

export const getPool =()=>{
  logger.info(`Get Pool`)
  return pool;
}
