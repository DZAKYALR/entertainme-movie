const { ObjectId } = require('mongodb')
const {getDatabase} = require('./../config/mongoDb')

class Movie {
    static findAll() {
        return getDatabase().collection('movies').find().toArray()
    }
    static findOne(id) {
        return getDatabase().collection('movies').find({_id:ObjectId(id)}).toArray()
    }
    static insert(data) {
        return getDatabase().collection('movies').insertOne(data)
    }
    static update(id, data) {
        return getDatabase().collection('movies').updateOne({_id:ObjectId(id)}, { 
            $set: { 
                "title": data.title, 
                "overview": data.overview, 
                "poster_path": data.poster_path, 
                "popularity": data.popularity,
                "tags": data.tags
            } })
    }
    static delete(id) {
        return getDatabase().collection('movies').deleteOne({_id:ObjectId(id)})
    }
}


module.exports = Movie