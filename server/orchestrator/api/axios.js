const axios = require('axios')

const movieApi = axios.create({
    baseURL: 'http://localhost:4001'
})

const tvSerieApi = axios.create({
    baseURL: 'http://localhost:4002'
})



module.exports = {
    movieApi,
    tvSerieApi
}