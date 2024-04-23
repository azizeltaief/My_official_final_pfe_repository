const User = require('../models/userModel')
const scriptModel = require('../models/scriptModel')
const adminAuth = async (req, res, next) => {
  // Destructure 'userType' from 'req.body' and rename it to 'admin'

  /*console.log("req.User")
  console.log(req.User)  //undefieneed
  console.log("req.user")
  console.log(req.user.id) //660ccef335aa321b95c3c404 the _id of the user
  console.log("req.body")
  console.log(req.body) //{ title: 'zcd', load: '2', reps: '2' }*/

  User.findById(req.user.id)  
  .then(user => {
    // Log the user's userType if found
    if (user) {
      console.log('User Type:', user.userType);
      next()
    } else {
      console.log('User not found');
    }
  })
  .catch(err => {
    // Log any errors that occur during the query
    return res.status(403).json({ message: "Unauthorized access" });
    console.error('Error:', err);
  });
  



  /*if (req.User.userType === 'admin') {
    // If userType is 'admin', proceed to the next middleware or route handler
    
    next();
  } else {
    // If userType is not 'admin', return a response indicating unauthorized access
    return res.status(403).json({ message: "Unauthorized access" });
  }*/



 }

module.exports = adminAuth