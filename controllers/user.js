require('dotenv').config()
const User = require('../models/User')
const jwt = require('jsonwebtoken')



const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body)
    const token = createJWT(user)
    res.status(200).json({
      userName: req.body.name,
      token: token,
    })
  } catch(err) {
    res.status(400).json(error)
  }
}



const loginUser = async (req,res) => {
  try {
    const user = await User.findOne({email: req.body.email})
    const token = createJWT(user)
    console.log(user)
    res.status(200).json({
      userName: user.name,
      token: token,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}





function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}

module.exports = {
  createUser,
  loginUser
}