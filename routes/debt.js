const express = require('express');
const router = express.Router();
const {newDebt, deleteDebt, getDebts, updateDebt} = require('../controllers/debt')
const {protect} = require('../middleware/auth')




router.use(protect)
router.get('/get', getDebts)
router.delete('/delete/:id', deleteDebt)
router.post('/new', newDebt)
router.put('/update/:id', updateDebt)

module.exports = router