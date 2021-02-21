const express = require('express')
const router = express.Router()
const tvController = require('../controllers/tvController')

router.post('/', tvController.insert)
router.get('/', tvController.findAll)
router.get('/:id', tvController.findOne)
router.put('/:id', tvController.update)
// router.patch('/:id', tvController.patch)
router.delete('/:id', tvController.delete)


module.exports = router