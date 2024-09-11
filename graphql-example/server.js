const express = require('express');
const path = require('path');
const { buildSchema  } = require('graphql');
const { graphqlHTTP } = require('express-graphql');
const  {makeExecutableSchema} = require('@graphql-tools/schema');
const  {loadFilesSync} = require('@graphql-tools/load-files');

const typeArray = loadFilesSync('**/*', {
  extensions: ['graphql'],
});
const resolversArray = loadFilesSync(path.join(__dirname, '**/*.resolver.js'));
  const schema = makeExecutableSchema({
    typeDefs: typeArray,
    resolvers:resolversArray
  });

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(3000, () => {
  console.log('Graphql Server is running on port 3000');
});