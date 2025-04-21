const jwt = require("jsonwebtoken")
const Student = require("../Models/StudantModel")

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt
  //chenc if the token exist and is valid
  if (token) {
    jwt.verify(token, 'manel post post secret', (err, decoded) => {
      if (err) {
        console.log("first error")
        next()
      } else {
        req.user = decoded
        console.log(decoded)
        next()
      }
    })
  } else {
    // not logged in => redirect to login page
    console.log("second error")

    next()
  }
}

const requireAuthAdmin = (req, res, next) => {
  const token = req.cookies.jwtAdmin
  //chenc if the token exist and is valid
  if (token) {
    jwt.verify(token, 'manel post post secret', (err, decoded) => {
      if (err) {
        console.log("first error")
        next()
      } else {
        req.user = decoded
        console.log(decoded)
        next()
      }
    })
  } else {
    // not logged in => redirect to login page
    console.log("second error")

    next()
  }
}








// check current user
const checkUser = (role) => {
  return (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) return res.redirect('/login');

    jwt.verify(token, 'manel post post secret', (err, decoded) => {
      if (err || decoded.role !== role) {
        return res.status(403).send('Unauthorized');
      }
      req.user = decoded;
      next();
    });
  };
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
  requireAuthAdmin

}

