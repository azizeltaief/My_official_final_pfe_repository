const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken= (_id)=>{
  return jwt.sign({_id},process.env.SECRET) //,{expiresIn:20}
}

const login = async(req,res) =>{
  const {email,password} = req.body
  try{
    const user = await User.login(email,password)
    const _id = user._id
    const userType = user.userType
    const token = createToken(user._id)
    res.status(200).json({_id,email,token,userType})
    //res.status(200).json({message:"signUp"})
  }
  catch(error)
  {
    res.status(400).json({error: error.message})
  }

  //res.status(200).json({message:"login"})
}

const signUp = async(req,res)=>{
  const {email,password,userType} = req.body
  try{
    const user = await User.signup(email,password,userType) 
    const token = createToken(user._id)
    res.status(200).json({email,token,userType})
    //res.status(200).json({message:"signUp"})
  }
  catch(error)
  {
    res.status(400).json({error: error.message})
  }

  
  
}




module.exports = {signUp,login}