import express, { Router, Request, Response, NextFunction } from "express";
import { logger, ValidData } from "../config/constants";
import handleRequest  from '../controllers/handleRequest'
const router: Router = express.Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {

    logger.info(`Post workerLookup`);

    const validatedData: ValidData = req.body.validatedData as ValidData;
    const lookup: string = req.body.lookup as string;
    
    const result = await handleRequest(validatedData, lookup);
    
    return res.status(200).json(result);

  } catch (e: any) {
    logger.error(e.stack || e);
    res.status(400).json({ message: e });
  }
});

export default router;
