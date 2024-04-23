//create schema & model for our data to be sure that every document in db is structured
//A schema defines the structure of a document inside a db
//Apply that schema to a particular model and we use that model to interact with a collection with that name

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const scriptSchema = new Schema({
  title:{ 
    type: String,
    required: true
  },
  reps:{
    type: Number,
    required: true
  },
  load:{
    type: Number,
    required: true
  },
  user_id:{
    type:String,
    required: true
  }
},
{ timestamps: true}
)
module.exports = mongoose.model('Script', scriptSchema) //create a model called Script and it will create a collection with the name Script

