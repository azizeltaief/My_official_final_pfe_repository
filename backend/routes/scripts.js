//the logic code of database isn't supposed to be here , here is the routes
const express = require('express')
const Controllers = require('../controllers/scriptController')
const UserControllers = require('../controllers/userController')



const User = require('../models/userModel')


const requireAuth = require('../middleware/requireAuth')
const adminAuth = require('../middleware/adminAuth')
//create an instance of the router
const router = express.Router()



// require auth for all workout routes
router.use(requireAuth)

router.use(adminAuth)

//login 
router.post('/login', UserControllers.login)
//signup
router.post('/signup', UserControllers.signUp)





//Get all scripts

router.get('/',  Controllers.getAllScripts)

//Get a single script
/*router.get('/:id', (req,res) =>{
  res.json({mssg:`Get a single script ${req.params.id}`})
})*/
router.get('/:id',   Controllers.getSingleScript )

//Post a new script
router.post('/',      Controllers.createScript)

//Delete a single script
router.delete('/:id',      Controllers.deleteScript)

//Update a single script
router.patch('/:id',      Controllers.updateScript)




module.exports = router