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