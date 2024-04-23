const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcrypt')  //npm install bcrypt
const validator = require('validator')

const userSchema = new Schema({
  email:{ 
    type: String,
    required: true,
    unique: true
  },  
  password:{ 
    type: String,
    required: true
  },
  userType:{
    type: String,
    required: true
  }
},
{ timestamps: true})

//static signUp fct
userSchema.statics.signup = async function(email,password,userType){
  if(!email || !password){
    throw Error('All fields should be filled')
  }
  const valideEmail = validator.isEmail(email)
  const validePassword = validator.isStrongPassword(password)
  if(!valideEmail){
    throw Error('This email is not valid')
  }
  if(!validePassword){
    throw Error('This password is not valid')
  }
  const exists = await this.findOne({email})
  if(exists){
    throw Error('This email is already used')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password,salt)
  const user = await this.create({email, password:hash, userType})
  return user





}
//static login fct
userSchema.statics.login = async function (email,password) {
  if(!email || !password){
    throw Error('All fields should be filled')
  }
  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)