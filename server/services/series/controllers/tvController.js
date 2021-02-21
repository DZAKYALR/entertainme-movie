const TvSeries = require('../models/tvSeries')

class TvController {
    static async findAll(req, res, next) {
        try {
            const tvSerie = await TvSeries.findAll()
            res.json(tvSerie)
        } 
        catch (error) {
        console.log(error);    
        }
     }
     static async findOne(req, res, next) {
        try {
            const tvSerie = await TvSeries.findOne(req.params.id)
            res.json(tvSerie)
        } 
        catch (error) {
        console.log(error);    
        }
     }
     static async insert(req, res, next) {
        try {
            const tvSerie = await TvSeries.insert(req.body)
            res.json(tvSerie)
        } 
        catch (error) {
        console.log(error);    
        }
     }

     static async update(req, res, next) {
        console.log(req.params.id);
        console.log(req.body);
        try {
            const tvSerie = await TvSeries.update(req.params.id,req.body)
            res.json(tvSerie)
        } 
        catch (error) {
        console.log(error);    
        }
     }

    static patch(req, res, next) {
        
    }

    static async delete(req, res, next) {
        try {
            const tvSerie = await TvSeries.delete(req.params.id)
            res.json(tvSerie)
        } 
        catch (error) {
        console.log(error);    
        }
     }
}

module.exports = TvController