
import workerPool from "workerpool"
import path from "path";
import { logger } from "../config/constants";

let poolProxy: any = null

export const init = async (options:any) => {
  const pool:any = workerPool.pool(path.join(__dirname, './getInfo.js'), options)
  poolProxy = await pool.proxy()
  logger.info(`Worker Threads Enabled - Min Workers: ${pool.minWorkers} - Max Workers: ${pool.maxWorkers} - Worker Type: ${pool.workerType}`)
}

export const get = () => {
  return poolProxy
}