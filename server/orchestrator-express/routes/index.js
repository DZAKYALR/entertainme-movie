const express = require('express')
const router = express.Router()
const movies = require('./movies')
const tvSeries = require('./tvSeries')
const entertainme = require('./entertainme')

router.get('/', (req, res) => {
    res.send('welcome to entertainme')
})
router.use('/tv-series',tvSeries )
router.use('/movies',movies )
router.use('/entertainme',entertainme )

module.exports = router