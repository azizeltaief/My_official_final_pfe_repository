//the logic code of database isn't supposed to be here , here is the routes
const express = require('express')
const UserControllers = require('../controllers/userController')
const UsersControllers = require('../controllers/usersController')
//create an instance of the router
const router = express.Router()

//login 
router.post('/login', UserControllers.login)
//signup
router.post('/signup', UserControllers.signUp)




//Get all users
router.get('/', UsersControllers.getAllUsers)
//Get a single user
router.get('/:id',   UsersControllers.getSingleUser )
//Post a new user
router.post('/',      UsersControllers.createUser)
//Delete a single user
router.delete('/:id',      UsersControllers.deleteUser)
//Update a single user
router.patch('/:id',     UsersControllers.updateUser)
//profile
router.post('/profile',   UsersControllers.profile)


module.exports = router