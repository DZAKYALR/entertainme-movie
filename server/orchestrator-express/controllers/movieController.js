const Redis = require("ioredis");
const redis = new Redis();
const axios = require('axios');
const url = 'http://localhost:4001'

class MovieController {
    static async findAll(req, res, next) {
        try {
            const movieData = await redis.get('movies:data')
            if (movieData) {
                console.log('request single from movies redis');
                res.status(200).json(JSON.parse(movieData))
            } else {
                axios.get(`${url}/movies`)
                    .then(response => {
                        redis.set("movies:data", JSON.stringify(response.data))
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
            const movieData = await redis.get(`movies:data:${req.params.id}`)
            if (movieData) {
                console.log('request single from movies redis');
                res.status(200).json(JSON.parse(movieData))
            } else {
                axios.get(`${url}/movies/${req.params.id}`)
                    .then(response => {
                        redis.set(`movies:data:${req.params.id}`, JSON.stringify(response.data))
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
            await redis.del("movies:data")
            const movie = await axios({
                method: 'post',
                url: `${url}/movies`,
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
            await redis.del("movies:data")
            const movie = await axios({
                method: 'put',
                url: `${url}/movies/${req.params.id}`,
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
            await redis.del("movies:data")
            const movie = await axios({
                method: 'delete',
                url: `${url}/movies/${req.params.id}`,
            });
            res.status(200).json(movie.data)
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = MovieController