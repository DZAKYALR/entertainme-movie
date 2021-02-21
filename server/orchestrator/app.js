const { ApolloServer, makeExecutableSchema } = require('apollo-server');
const movieScheme = require('./scheme/movieScheme')
const tvSeriesScheme = require('./scheme/tvSeriesScheme')
const typeDefs = `
    type Query
    type Mutation
`

const schema = makeExecutableSchema({
    typeDefs: [typeDefs, movieScheme.typeDefs, tvSeriesScheme.typeDefs],
    resolvers: [movieScheme.resolvers, tvSeriesScheme.resolvers]
})
const server = new ApolloServer({ schema });
    server.listen().then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
    });