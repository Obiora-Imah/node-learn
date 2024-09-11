const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const  {makeExecutableSchema} = require('@graphql-tools/schema');
const  {loadFilesSync} = require('@graphql-tools/load-files');
const typeArray = loadFilesSync('**/*', {
  extensions: ['graphql'],
});
const resolversArray = loadFilesSync(path.join(__dirname, '**/*.resolver.js'));
  
async function startApolloServer(params) {
  const app = express();
  const schema = makeExecutableSchema({
    typeDefs: typeArray,
    resolvers:resolversArray
  });

  const server = new ApolloServer({ schema });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(3000, () => {
    console.log('Graphql Server is running on port 3000');
  });
}

startApolloServer();

