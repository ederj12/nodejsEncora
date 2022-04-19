import "dotenv/config";
import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import lookup from "./routers/lookup";
import { logger } from "./config/constants";
import { initPool } from "./utils/workerPool";

const app: Express = express();

app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/lookup", lookup);

app.listen(process.env.PORT, async () => {
  await initPool();
  logger.info(`API listening on port ${process.env.PORT}!`);
});
