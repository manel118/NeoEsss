const jwt = require("jsonwebtoken")
const Student = require("../Models/StudantModel")
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt
  //chenc if the token exist and is valid
  if (token) {
    jwt.verify(token, 'manel post post secret', (err, decoded) => {
      if (err) {
        res.redirect(`${decode.role}/login`)
        console.log(err.message)

      } else {
        req.user = decoded
        console.log(decoded)
        next()
      }
    })
  } else {
    // not logged in => redirect to login page
    next()
  }
}

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'manel post post secret', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {


        const user = getRelated(decodedToken)
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};


const getRelated = async (decoded) => {
  let finalUser
  if (decoded.role == 'student') {
    finalUser = Student.findById(decoded.id)

  }
  if (decoded.role == 'admin') {
    finalUser = Student.findById(decoded.id)
  } if (decoded.role == 'teacher') {
    finalUser = Student.findById(decoded.id)

  }
  return finalUser
}

module.exports = {
  requireAuth,
  checkUser

}

