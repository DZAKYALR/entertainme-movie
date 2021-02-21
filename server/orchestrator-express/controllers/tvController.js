const Redis = require("ioredis");
const redis = new Redis();
const axios = require('axios');
const url = 'http://localhost:4002'

class TvController {
    static async findAll(req, res, next) {
        try {
            const tvData = await redis.get('tv:data')
            if (tvData) {
                console.log('request single from tv redis');
                res.status(200).json(JSON.parse(tvData))
            } else {
                axios.get(`${url}/tv-series`)
                    .then(response => {
                        redis.set("tv:data", JSON.stringify(response.data))
                        res.status(200).json(response.data)
                    })
                    .catch(err => {
                        res.status(500).json(err)
                    })
            }
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
    static async findOne(req, res, next) {
        try {
            const movieData = await redis.get(`tv:data:${req.params.id}`)
            if (movieData) {
                console.log('request single from tv redis');
                res.status(200).json(JSON.parse(movieData))
            } else {
                axios.get(`${url}/tv-series/${req.params.id}`)
                    .then(response => {
                        redis.set(`tv:data:${req.params.id}`, JSON.stringify(response.data))
                        res.status(200).json(response.data)
                    })
                    .catch(err => {
                        res.status(500).json(err)
                    })
            }
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
    static async insert(req, res, next) {
        try {
            await redis.del("tv:data")
            const movie = await axios({
                method: 'post',
                url: `${url}/tv-series`,
                data: {
                    title: req.body.title,
                    overview: req.body.overview,
                    poster_path: req.body.poster_path,
                    popularity: req.body.popularity,
                    tags: req.body.tags
                }
            });
            res.status(201).json(movie.data)
        }
        catch (err) {
            res.status(500).json(err)
        }
    }

    static async update(req, res, next) {
        try {
            await redis.del("tv:data")
            const movie = await axios({
                method: 'put',
                url: `${url}/tv-series/${req.params.id}`,
                data: {
                    title: req.body.title,
                    overview: req.body.overview,
                    poster_path: req.body.poster_path,
                    popularity: req.body.popularity,
                    tags: req.body.tags
                }
            });
            res.status(200).json(movie.data)
        }
        catch (err) {
            res.status(500).json(err)
        }
    }

    // static patch(req, res, next) {

    // }

    static async delete(req, res, next) {
        try {
            await redis.del("tv:data")
            const movie = await axios({
                method: 'delete',
                url: `${url}/tv-series/${req.params.id}`,
            });
            res.status(200).json(movie.data)
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = TvController