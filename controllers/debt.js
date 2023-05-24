const Debt = require('../models/Debt')



const getDebts = async (req,res) => {
  try {
    const userDebts = await Debt.find({user: req.user._id})
    res.status(200).json(userDebts)
  } catch (error) {
    res.status(400).json(error)
  }
}




const newDebt = async (req,res) => {
  console.log(req.user)
  try {
    const debt = await Debt.create({...req.body, user: req.user})
    const userDebts = await Debt.find({user: req.user._id})
    res.status(200).json(userDebts) 
  } catch (error) {
    res.status(400).json(error)
  }
}


const deleteDebt = async (req,res) => {
  try {
    const deletedDebt = await Debt.findByIdAndRemove(req.params.id)
  } catch (error) {
    res.status(400).json(error)
  }
}

const updateDebt = async (req,res) => {
  try {
   const updatedDebt = await Debt.findByIdAndUpdate(req.params.id, req.body)
   const userDebts = await Debt.find({user: req.user._id})
   res.status(200).json(userDebts)
  } catch (error) {
    res.status(400).json(error)
  }
}




module.exports = {newDebt, updateDebt, deleteDebt, getDebts}