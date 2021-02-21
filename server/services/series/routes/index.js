const express = require('express')
const router = express.Router()
const tvSeries = require('./tvSeries')

router.get('/', (req, res) => {
    res.send('welcome to entertainme series')
  })

router.use('/tv-series',tvSeries )


module.exports = router