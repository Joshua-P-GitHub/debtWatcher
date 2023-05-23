const express = require('express');
const router = express.Router();
const {newDebt, deleteDebt, getDebts} = require('../controllers/debt')
const {protect} = require('../middleware/auth')




router.use(protect)
router.get('/get', getDebts)
router.delete('/delete/:id', deleteDebt)
router.post('/new', newDebt)

module.exports = router