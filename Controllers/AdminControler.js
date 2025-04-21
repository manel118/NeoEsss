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




module.exports.login_get = async (req, res) => {
        // res.render("login")
        res.send(`you're in admin login page`); // render
    } 



module.exports.Dashbord_get = async (req, res) => {
    if (req.user) {
        const user = req.user
        req.user = user
        res.redirect(`/admin/dashboard`);
    } else { res.send(" redirected to login page") }
    res.send(`you are in the admin dashbord , adminID : ${req.user.id}`);
    //   res.render("joi,gf.html",)

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


