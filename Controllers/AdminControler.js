// add_user_get , add_user_post 
//dashbord_get 
// note_get , note_post 
// studants/:id_get 

const mongoose =require("mongoose")

const Admin = require("../Models/AdminModel")
const authController = require('../Controllers/AuthControler')
const User = require('../Models/UserModel')

module.exports.Dashbord_get = async (req,res)=>{
    if (req.user.role !== 'admin') {
        return res.status(403).send('Forbidden  ,this is private page');
      }
      res.send(`you are in the admin dashbord , adminID : ${req.user.id}`);
    //   res.render("joi,gf.html",)
   
}

module.exports.create_student_account_post = async (req,res)=>{
    const id =  new mongoose.Types.ObjectId(req.body.id)
    const email = req.body.email
    const password = req.body.password
    
        try {
            const user = await User.create({ email : email, password , password : password , student : id })
            res.status(201).json(user)
        } catch (err) {
            const errors = authController.hundleErrors(err)
            res.status(400).json(errors)
        }
}


