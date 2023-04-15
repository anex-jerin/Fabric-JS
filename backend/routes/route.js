const express = require('express')
const router = express.Router()
const {addFabric} = require('../control/fabric')

router.route('/create').post(addFabric)
router.route('/getFabric').post(addFabric)
// router.route('/:id').delete(deleteBook)


module.exports = router  