import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json"
import lookup from "./routers/lookup";

const app: express.Application = express();

app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/lookup", lookup);


app.listen(process.env.PORT, () =>
  console.log(`API listening on port ${process.env.PORT}!`)
);

////////GRAPHQL PENDING TO ADD
/*

import graphqlHTTP from "express-graphql";
import { makeExecutableSchema } from "graphql-tools";

let typeDefs: any = [
    `
    type Query {
      hello: String
    }
       
    type Mutation {
      hello(message: String) : String
    }
  `,
  ];

let helloMessage: String = "World!";

let resolvers = {
  Query: {
    hello: () => helloMessage,
  },
  Mutation: {
    hello: (_: any, helloData: any) => {
      helloMessage = helloData.message;
      return helloMessage;
    },
  },
};

app.use(
    "/graphql",
    graphqlHTTP({
      schema: makeExecutableSchema({ typeDefs, resolvers }),
      graphiql: true,
    })
  );

  */
