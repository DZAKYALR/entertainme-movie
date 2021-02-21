const express = require('express')
const router = express.Router()
const MovieController = require('./../controllers/movieController')

router.post('/', MovieController.insert)
router.get('/', MovieController.findAll)
router.get('/:id', MovieController.findOne)
router.put('/:id', MovieController.update)
router.delete('/:id', MovieController.delete)


module.exports = router