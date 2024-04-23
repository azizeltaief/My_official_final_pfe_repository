//create a bunch of functions and call them in the scripts.js file where there are routes
const { default: mongoose } = require('mongoose')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')  //npm install bcrypt
const validator = require('validator')

//Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};
//Get a single user
const getSingleUser = async(req,res)=>{
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error : "False id"})
  }
  const user = await User.findById(id) //.find({_id:id})  //(script[0])   
  if(!user){
    return res.status(404).json({error : "User not found"})
  }
  res.status(200).json(user)  
}
//Create a new user
const createUser = async(req,res)=>{
  const {email,password,userType} = req.body //title=req.body.title
  let emptyFields = []
  if(!email){
    emptyFields.push('email')
  }
  if(!password){
    emptyFields.push('password')
  }
  if (emptyFields.length > 0){
    return res.status(400).json({error: 'Please fill all the fields',emptyFields})
  }


  //checking email and password
  const valideEmail = validator.isEmail(email)
  const validePassword = validator.isStrongPassword(password)
  if(!valideEmail){
    return res.status(422).json({error: 'This email is not valid',emptyFields})
  }
  if(!validePassword){
    return res.status(422).json({error: 'This password is not valid',emptyFields})
  }
  const exists = await User.findOne({email})
  if(exists){
    return res.status(409).json({error: 'This email is already used',emptyFields})
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password,salt)

  //add doc to db
  try{
    const user = await User.create({email,password:hash,userType})
    res.status(200).json(user)
  }catch(error){
    return res.status(400).json({error: error.message,emptyFields})
  }
}
//Delete a user
const deleteUser = async(req,res)=>{
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error : "False id"})
  }
  const user = await User.findOneAndDelete({_id:id})
  if(!user){
    return res.status(404).json({error : "User not found"})
  }
  res.status(200).json(user)  
}
//Update a user
const updateUser = async(req,res)=>{
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error : "False id"})
  }


  const {email,password,userType} = req.body //title=req.body.title
  let emptyFields = []
  if(!email){
    emptyFields.push('email')
  }
  if(!password){
    emptyFields.push('password')
  }
  if (emptyFields.length > 0){
    return res.status(400).json({error: 'Please fill all the fields',emptyFields})
  }
  
  
  
  
  
  
  
  
  //checking email and password

    const valideEmail = validator.isEmail(email)
    if(!valideEmail){
      return res.status(422).json({error: 'This email is not valid'})
    }


    const validePassword = validator.isStrongPassword(password)
    if(!validePassword){
      return res.status(422).json({error: 'This password is not valid'})
    }

    const exists = await User.findOne({email})
    if(exists && exists.email !== email){
      /*console.log("email"+email)
      console.log("exists"+exists.email)*/
      return res.status(409).json({error: 'This email is already used'})}

      /*if (exists.email === email  && password ===""  && exists.userType === userType){
        console.log("No changes")
        return
      }*/
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)
    const updateValues = { ...req.body };
    updateValues.password = hash;
    const user = await User.findOneAndUpdate({_id:id},
      updateValues //it will take the two properties and it wil update & add it to the user
    )
    if(!user){
      return res.status(404).json({error : "User not found"})
    }
    res.status(200).json(user) 



 


}
//Profile
const profile = async(req,res)=>{

}

module.exports = {
 createUser,
 getAllUsers,
 getSingleUser,
 updateUser,
 deleteUser,
 profile
}