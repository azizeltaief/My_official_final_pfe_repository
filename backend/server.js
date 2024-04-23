//we will register the express app here
//npm init -y to create json file
//npm install express
//when u push the code into github you add .env file to .ignore file to hide sensible informations
//npm install dotenv(node package that loads environment variables from .env file into the the process.env object) to us
//we use mongoose to add the layer of structure to mongodb and to connect to the database
const express = require('express')
require('dotenv').config()


const app = express()  //create express app and store it in app
const scriptsRoutes = require('./routes/scripts')
const userRoutes = require('./routes/users')
const {mongoose} = require('mongoose')

//Creating a middleware
app.use(express.json()) //it parses the request body and attach it to the request object so we can access it in the request handler in the routes( req.body)=> from json to js object
app.use((req,res,next)=>{
  console.log(req.path,'\t',req.method)
  next()

})


//routes
app.get('/', (req,res)=>{
  console.log("successed")
  res.json({msg: 'welcome to the app'})
})
app.use('/api/scripts',scriptsRoutes) //it grabs all the routes from scripts file+the path should begin with api/scripts
app.use('/api/user',userRoutes)

//connect to db (asynchronous)
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  //listen for requests
  app.listen(process.env.PORT, ()=>{
  console.log('Connecting to db & Listenning on port',process.env.PORT)
  })
})
.catch((error)=>{
  /*console.log(process.env.MONGO_URI)
  console.log(error.message)
  console.log(process.env.PORT)*/
  console.log(error)
})
/*const { MongoClient } = require('mongodb');

// MongoDB Atlas connection URI
const uri = process.env.MONGO_URI;

// Create a new MongoClient
const client = new MongoClient(uri);

// Function to connect to the MongoDB database
async function connectToDatabase() {
    try {
        // Connect to the MongoDB database
        await client.connect();
        console.log("Connected to the MongoDB database");

        // If you need to perform any database operations, you can do so here

    } catch (error) {
        console.error("Error connecting to the MongoDB database:", error);
    }
}

// Call the connectToDatabase function to establish the connection
connectToDatabase();*/




//to try different requests (post,delete,patch..) we sould make some javasript front code or use postman




/*const os = require('os');
const networkInterfaces = os.networkInterfaces();

Object.keys(networkInterfaces).forEach((iface) => {
  networkInterfaces[iface].forEach((details) => {
    if (details.family === 'IPv4' && !details.internal) {
      console.log('IP Address:', details.address);
    }
  });
});*/