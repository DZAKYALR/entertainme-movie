const express = require('express')
const router = express.Router()
const movies = require('./movies')

router.get('/', (req, res) => {
    res.send('welcome to entertainme movies')
  })

router.use('/movies',movies )


module.exports = router