//we made this middleware to protect the data(scripts page) from no loged in users
//it will grab the datat only for authorized users(who login)when using postman we can try to add the correct token to request successed
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, process.env.SECRET)

    req.user = await User.findOne({ _id }).select('_id')//in this case the user will onlyhave an id property(because we've used the .select('_id')) and we can use the user property in next fcts called after this middelware
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = requireAuth 