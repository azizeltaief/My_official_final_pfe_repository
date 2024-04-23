//create a bunch of functions and call them in the scripts.js file where there are routes

const { default: mongoose } = require('mongoose')
const Script = require('../models/scriptModel')

//Get all scripts
const getAllScripts = async(req,res)=>{
  const user_id = req.user._id
  const scripts = await Script.find({user_id}).sort({createdAt: -1}) //array of documents from db//we will only find documents that they're user id match the doc id(only the document created by the current logged in user)
  res.status(200).json(scripts) //a JSON-formatted array of JavaScript objects
}
//Get a single script
const getSingleScript = async(req,res)=>{
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error : "False id"})
  }
  const script = await Script.findById(id) //.find({_id:id})  //(script[0])   
  if(!script){
    return res.status(404).json({error : "Script not found"})
  }
  res.status(200).json(script)  
}
//Create a new script
const createScript = async(req,res)=>{
  const {title,load,reps} = req.body //title=req.body.title
  let emptyFields = []
  if(!title){
    emptyFields.push('title')
  }
  if(!load){
    emptyFields.push('load')
  }
  if(!reps){
    emptyFields.push('reps')
  }
  if (emptyFields.length > 0){
    return res.status(400).json({error: 'Please fill all the fields',emptyFields})
  }

  //add doc to db
  try{
    const user_id = req.user._id  //because in the midelware we have added the property user to the request before we call next() before we run the controller fcts 
    const script = await Script.create({title,load,reps,user_id})
    res.status(200).json(script)
  }catch(error){
    res.status(400).json({error: error.message})
  }
}

//Delete a script
const deleteScript = async(req,res)=>{
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error : "False id"})
  }
  const script = await Script.findOneAndDelete({_id:id})
  if(!script){
    return res.status(404).json({error : "Script not found"})
  }
  res.status(200).json(script)  
}
//Update a script
const updateScript = async(req,res)=>{
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error : "False id"})
  }
  const script = await Script.findOneAndUpdate({_id:id},{
    ...req.body //it will take the two properties and it wil update & add it to the script
  })
  if(!script){
    return res.status(404).json({error : "Script not found"})
  }
  res.status(200).json(script)  
}



module.exports = {
  createScript,
  getAllScripts,
  getSingleScript,
  updateScript,
  deleteScript
}