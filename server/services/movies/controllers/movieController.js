const Movies = require('../models/movie')

class MovieController {
    static async findAll(req, res, next) {
       try {
           const movies = await Movies.findAll()
           res.json(movies)
       } 
       catch (error) {
       console.log(error);    
       }
    }
    static async findOne(req, res, next) {
        try {
            const movie = await Movies.findOne(req.params.id)
            res.json(movie)
        } 
        catch (error) {
        console.log(error);    
        }
     }
    static async insert(req, res, next) {
       try {
           const movie = await Movies.insert(req.body)
           res.json(movie)
       } 
       catch (error) {
       console.log(error);    
       }
    }

    static async update(req, res, next) {
        try {
            const movie = await Movies.update(req.params.id,req.body)
            res.json(movie)
        } 
        catch (error) {
        console.log(error);    
        }
     }

    static patch(req, res, next) {
        
    }

    static async delete(req, res, next) {
        try {
            const movie = await Movies.delete(req.params.id)
            res.json(movie)
        } 
        catch (error) {
        console.log(error);    
        }
     }
}

module.exports = MovieController