const { ObjectId } = require('mongodb')
const {getDatabase} = require('./../config/mongoDb')

class TvSeries {
    static findAll() {
        return getDatabase().collection('tvseries').find().toArray()
    }
    static findOne(id) {
        return getDatabase().collection('tvseries').find({_id:ObjectId(id)}).toArray()
    }
    static insert(data) {
        return getDatabase().collection('tvseries').insertOne(data)
    }
    static update(id, data) {
        return getDatabase().collection('tvseries').updateOne({_id:ObjectId(id)}, { 
            $set: { 
                "title": data.title, 
                "overview": data.overview, 
                "poster_path": data.poster_path, 
                "popularity": data.popularity,
                "tags": data.tags
            } })
    }
    static delete(id) {
        return getDatabase().collection('tvseries').deleteOne({_id:ObjectId(id)})
    }
}


module.exports = TvSeries