const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const debtSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  title: {type: String, required: true},
  originalAmount: {type: Number, required: true},
  amountPutInDebt: {type: Number, required: true},
  isCompleted: {type: Boolean, default: false},
  log: [Number]
})







module.exports = mongoose.model('UserDebt', debtSchema);