// add_user_get , add_user_post 
//dashbord_get 
// note_get , note_post 
// studants/:id_get 

const mongoose = require("mongoose")
const student = require("../Models/StudantModel")
const teacher = require("../Models/TeacherModel")
const admin = require("../Models/AdminModel")
const Admin = require("../Models/AdminModel")
const authController = require('../Controllers/AuthControler')
const User = require('../Models/UserModel')
const {hundleErrors} = require("./AuthControler")
const jwt = require("jsonwebtoken")


// create token
const maxAge = 60 * 60 * 24 * 3
const createToken = (id, role) => {
    return jwt.sign({ id, role }, 'manel post post secret', {
        expiresIn: maxAge
    }) // id ()payload , secretkey , and the header is auto created
}


module.exports.login_get = async (req, res) => {
    console.log(req.cookies)

    if (req.user)
        res.redirect("/admin/dashboard") // render
    else
        res.send(`you're in admin login page`); // render
}

module.exports.login_post = async (req, res) => {
    const { email, password, role } = req.body;
    // compare hashed password done in the user model
    try {

        let user = await Admin.login(email, password)
        // atach a jwt
        const token = createToken(user._id, role)
        res.cookie('jwtAdmin', token, {
            httpOnly: true,
            maxAge: maxAge * 1000
        })
            res.status(200).redirect(`/admin/dashboard`) // should redirect to admin route or student/teacher route
       
    } catch (err) {
        const errors = hundleErrors(err)
        res.status(400).json(errors)
    }
}

module.exports.Dashbord_get = async (req, res) => {
    console.log("you are in dashboard")
    if (req.user) {
        res.send(`you are in the admin dashbord , adminID : ${req.user.id}`);
    } else { res.redirect("/admin/login") }
}

module.exports.create_user_account_post = async (req, res) => {
    const classid = req.body.classe ? new mongoose.Types.ObjectId(req.body.classe) : null
    let Model = getModel(req.body.role)
    let data = req.body
    data = { ...data, classe: classid };
    delete data['role'];

    try {
        const user = await Model.create(data)
        console.log(user)
        res.status(200).json(user)
    } catch (err) {
        const errors = authController.hundleErrors(err)
        res.status(400).json(errors)
    }

}
// admin logout
 module.exports.logout_get = (req, res) => {
    res.cookie('jwtAdmin', '', {
        maxAge: 1
    })
    res.redirect('/admin/login')
}


function getModel(role) {
    if (role == "student") {
        return student
    }
    if (role == "teacher") {
        return teacher
    }
    if (role == "admin") {
        return admin
    }
}


