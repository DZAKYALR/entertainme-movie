const { gql, ApolloError } = require('apollo-server');
const Redis = require("ioredis");
const redis = new Redis();
const { movieApi } = require('./../api/axios')
const typeDefs = gql`
    type Movie {
        _id: ID
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
        kindOf: String
        video: String
    }

    extend type Query {
        movies: [Movie]
        movie(_id: ID): Movie
    }

    input MovieInput {
        title: String!
        overview: String!
        poster_path: String!
        popularity: Float!
        tags: [String!]!
        kindOf: String
        video: String


    }

    extend type Mutation {
        insertMovie(data: MovieInput):Movie
        updateMovie(_id: ID, data: MovieInput):Movie
        deleteMovie(_id: ID):Movie
    }
`

const resolvers = {
    Query: {
        movies: async () => {
            try {
                const movieData = await redis.get('movies:data')
                if (movieData) {
                    console.log('REDIS CACHE MV');
                    return JSON.parse(movieData)
                } else {
                    const movies = await movieApi({
                        method: 'GET',
                        url: '/movies'
                    })
                    redis.set("movies:data", JSON.stringify(movies.data))
                    console.log('NEW FETCH MV');
                    return movies.data
                }

            } catch (error) {
                throw new ApolloError ({
                    error
                })
            }
        },
        movie: async (_, args) => {
            try {
                const movieData = await redis.get(`movies:data:${args._id}`)
                if (movieData) {
                    console.log('REDIS CACHE MV BY ID');
                    return JSON.parse(movieData)
                } else {
                    const movie = await movieApi({
                        method: 'GET',
                        url: `/movies/${args._id}`
                    })
                    redis.set(`movies:data:${args._id}`, JSON.stringify(movie.data[0]))
                    console.log('NEW FETCH MV BY ID');
                    return movie.data[0]
                }

            } catch (error) {
                throw new ApolloError ({
                    error
                })
            }
        }
    },
    Mutation: {
        insertMovie: async (parent, args, context, info) => {
            try {
                await redis.del("movies:data")
                const movie = await movieApi({
                    method: 'POST',
                    url: `/movies`,
                    data: {
                        title: args.data.title,
                        overview: args.data.overview,
                        poster_path: args.data.poster_path,
                        popularity: args.data.popularity,
                        tags: args.data.tags,
                        kindOf: args.data.kindOf,
                        video: args.data.video
                    }
                })
                return movie.data.ops[0]
            } catch (error) {
                throw new ApolloError ({
                    error
                })
            }
        },
        updateMovie: async (parent, args, context, info) => {
            try {
                await redis.del("movies:data")
                const movie = await movieApi({
                    method: 'PUT',
                    url: `/movies/${args._id}`,
                    data: {
                        title: args.data.title,
                        overview: args.data.overview,
                        poster_path: args.data.poster_path,
                        popularity: args.data.popularity,
                        tags: args.data.tags,
                        video: args.data.video

                    }
                })
                console.log(movie);
                return movie
            } catch (error) {
                throw new ApolloError ({
                    error
                })
            }
        },
        deleteMovie: async (parent, args, context, info) => {
            console.log(args._id);
            try {
                await redis.del("movies:data")
                const movie = await movieApi({
                    method: 'DELETE',
                    url: `/movies/${args._id}`,
                })
                console.log(movie);
                return movie
            } catch (error) {
                throw new ApolloError ({
                    error
                })
            }
        }
    }
}

module.exports = { 
    typeDefs,
    resolvers
 }