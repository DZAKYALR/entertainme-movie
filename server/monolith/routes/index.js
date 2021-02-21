const express = require('express')
const router = express.Router()
const movies = require('./movies')
const tvSeries = require('./tvSeries')

router.get('/', (req, res) => {
    res.send('welcome to entertainme')
  })

router.use('/movies',movies )
router.use('/tv-series',tvSeries )


module.exports = router