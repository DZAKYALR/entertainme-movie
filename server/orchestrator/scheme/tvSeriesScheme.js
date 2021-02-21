const { gql, ApolloError } = require('apollo-server');
const Redis = require("ioredis");
const redis = new Redis();
const { tvSerieApi } = require('./../api/axios')
const typeDefs = gql`
    type Series {
        _id: ID
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
        video: String

    }

    extend type Query {
        tvSeries: [Series]
        serie(_id: ID): Series
    }

    input SerieInput {
        title: String!
        overview: String!
        poster_path: String!
        popularity: Float!
        tags: [String!]!
        video: String
    }

    extend type Mutation {
        insertSerie(data: SerieInput):Series
        updateSerie(_id: ID, data: SerieInput):Series
        deleteSerie(_id: ID):Series
    }
`

const resolvers = {
    Query: {
        tvSeries: async () => {
            try {
                const tvSeriesData = await redis.get('tvSeries:data')
                if (tvSeriesData) {
                    console.log('REDIS CACHE TV');
                    return JSON.parse(tvSeriesData)
                } else {
                    const series = await tvSerieApi({
                        method: 'GET',
                        url: '/tv-series'
                    })
                    redis.set("tvSeries:data", JSON.stringify(series.data))
                    console.log('NEW FETCH TV');
                    return series.data
                }
            } catch (error) {
                throw new ApolloError ({
                    error
                })
            }
        },
        serie: async (_, args) => {
            try {
                const tvSeriesData = await redis.get(`tv:data:${args._id}`)
                if (tvSeriesData) {
                    console.log('REDIS CACHE TV BY ID');
                    return JSON.parse(tvSeriesData)
                } else {
                    const series = await tvSerieApi({
                        method: 'GET',
                        url: `/tv-series/${args._id}`
                    })
                    redis.set(`tv:data:${args._id}`, JSON.stringify(series.data[0]))
                    console.log('NEW FETCH TV BY ID');
                    return series.data[0]
                }
            } catch (error) {
                throw new ApolloError ({
                    error
                })
            }
        }
    },
    Mutation: {
        insertSerie: async (parent, args, context, info) => {
            try {
                await redis.del("tvSeries:data")
                const series = await tvSerieApi({
                    method: 'POST',
                    url: `/tv-series`,
                    data: {
                        title: args.data.title,
                        overview: args.data.overview,
                        poster_path: args.data.poster_path,
                        popularity: args.data.popularity,
                        tags: args.data.tags,
                        video: args.data.video

                    }
                })
                return series.data.ops[0]
            } catch (error) {
                throw new ApolloError ({
                    error
                })
            }
        },
        updateSerie: async (parent, args, context, info) => {
            console.log(args._id, args.data);
            try {
                await redis.del("tvSeries:data")
                const serie = await tvSerieApi({
                    method: 'PUT',
                    url: `/tv-series/${args._id}`,
                    data: {
                        title: args.data.title,
                        overview: args.data.overview,
                        poster_path: args.data.poster_path,
                        popularity: args.data.popularity,
                        tags: args.data.tags,
                        video: args.data.video

                    }
                })
                return serie
            } catch (error) {
                throw new ApolloError ({
                    error
                })
            }
        },
        deleteSerie: async (parent, args, context, info) => {
            try {
                await redis.del("tvSeries:data")
                const serie = await tvSerieApi({
                    method: 'DELETE',
                    url: `/tv-series/${args._id}`,
                })
                return serie
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