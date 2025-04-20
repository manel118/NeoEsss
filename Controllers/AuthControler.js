// controller actions
const User = require("../Models/UserModel")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

//hundleErrors 
const hundleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = { email: '', password: '' }
     //inccorect email
     if(err.message == "incorrect email" ){
        errors.email = "that email is  not regiteres"
     }
     //inccorect password
     if(err.message == "incorrect password" ){
        errors.password = "that password is incorrect"
     }


    // duplicate error code
    if (err.code == 11000) {
        errors.email = 'that email is already registered'
        return errors
    }
    //validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        });
    }
    return errors
}

// create token
const maxAge = 60 * 60 * 24 * 3
const createToken = (id,role) => {
    return jwt.sign({ id ,role}, 'manel post post secret', {
        expiresIn: maxAge
    }) // id ()payload , secretkey , and the header is auto created
}




const signup_get = (req, res) => {
    res.render('signup');
}

const login_get = (req, res) => {
    res.render('login');
}


const signup_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password })
        const token = createToken(user._id)
        res.cookie('jwt', token), {
            httpOnly: true,
            maxAge: maxAge * 1000
        }
        res.status(201).json(user)
    } catch (err) {
        const errors = hundleErrors(err)
        res.status(400).json(errors)
    }
}

const login_post = async (req, res) => {
    const { email, password , role} = req.body;
    //authentication
    // compare hashed password done in the user model
    try {
        let user = await User.login(email, password ,role)
        user = user.student
        console.log(user)
        // atach a jwt
        const token = createToken(user._id,role)
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000
        })
        res.status(200).json(user)
    } catch (err) {
        const errors = hundleErrors(err)
        res.status(400).json(errors)
    }
}

const logout_get =  (req,res)=>{
    res.cookie('jwt','',{
        maxAge : 1
    })
    res.redirect('/')
}

module.exports ={
    logout_get,
    login_post,
    signup_post,
    signup_get,
    login_get,
    hundleErrors 
}