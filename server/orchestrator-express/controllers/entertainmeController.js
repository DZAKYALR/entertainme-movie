const Redis = require("ioredis");
const redis = new Redis();
const axios = require('axios');
let one = "http://localhost:4001/movies"
let two = "http://localhost:4002/tv-series"

class EntertainmeController {
    static async get(req, res, next) {
        try {
            const movieData = await redis.get('movies:data');
            const tvSeries = await redis.get("tv:data");
            if (movieData && tvSeries) {
                console.log('from redis');
                res.status(200).json({
                    movies: JSON.parse(movieData),
                    tvSeries: JSON.parse(tvSeries)
                })
            } else {
                const requestOne = axios.get(one);
                const requestTwo = axios.get(two);
                axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
                    const responseOne = responses[0]
                    const responseTwo = responses[1]
                    redis.set("movies:data", JSON.stringify(responseOne.data))
                    redis.set("tv:data", JSON.stringify(responseTwo.data))
                    res.status(200).json({
                        movies: (responseOne.data),
                        tvSeries: (responseTwo.data)
                    })
                })).catch(err => {
                    res.status(500).json(err)
                })
            }
        } catch (error) {
            res.status(500).json(err)
        }
     }
}

module.exports = EntertainmeController