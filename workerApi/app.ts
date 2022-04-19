import "dotenv/config";
import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import workerLookup from "./routers/workerLookup";
import { logger } from "./config/constants";
import { initPool } from "./workers/workerPool";

const app: Express = express();

app.use(express.json());

app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/workerLookup", workerLookup);

app.listen(process.env.PORT, async () => {
  await initPool();
  logger.info(`API listening on port ${process.env.PORT}!`);
});
