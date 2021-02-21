const express = require('express')
const router = express.Router()
const EntertainmeController = require('./../controllers/entertainmeController')

router.get('/', EntertainmeController.get)

module.exports = router
