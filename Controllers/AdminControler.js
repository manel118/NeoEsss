// add_user_get , add_user_post 
//dashbord_get 
// note_get , note_post 
// studants/:id_get 

const mongoose = require("mongoose")
const student = require("../Models/StudantModel")
const teacher = require("../Models/TeacherModel")
const Admin = require("../Models/AdminModel")
const authController = require('../Controllers/AuthControler')
const classModel = require('../Models/ClassModel')
const { hundleErrors } = require("./AuthControler")
const jwt = require("jsonwebtoken")
const MatierModel = require("../Models/MatiéreModel")
const { json } = require("express")
const ModuleModel = require("../Models/ModuleModel")


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
        res.render("login") // render
}

module.exports.login_post = async (req, res) => {
    const { username, password } = req.body;
    // compare hashed password done in the user model
    try {

        let user = await Admin.login(username, password)
        // atach a jwt
        const token = createToken(user._id, "admin")
        res.cookie('jwtAdmin', token, {
            httpOnly: true,
            maxAge: maxAge * 1000
        })
        res.status(200).json({ user: user._id }) // should redirect to admin route or student/teacher route

    } catch (err) {
        const errors = hundleErrors(err)
        res.status(400).json({ errors })
    }
}

module.exports.Dashbord_get = async (req, res) => {
    console.log("you are in dashboard")
    if (req.user) {
        const matieres = await MatierModel.find().sort({ nom: 1 })
        const teachers = await teacher.find()
        res.render("Deshboard", { matieres, teachers })
        console.log(`you are in the admin dashbord , adminID : ${req.user.id}`);
    } else { res.redirect("/admin/login") }
}

// add a teacher or a studant
module.exports.create_user_account_post = async (req, res) => {
    let Model
    let role = req.body.role
    let data = req.body.user
    if (role == "teacher") {
        Model = teacher
    }
    if (role == "student") {
        Model = student
        const spe = data.classe.split(' ')[1]
        const niv = data.classe.split(' ')[0]
        const classid = await classModel.findOne({
            spécialité: spe,
            niveau: niv
        })
        data = classid ? { ...data, classe: classid._id } : data
    }

    console.log(data)
    try {
        const user = await Model.create(data)
        const result = await classModel.updateOne({ _id: user.classe }, { $push: { students: user._id } })
        console.log(user)
        res.status(200).json(user)
    } catch (err) {
        const errors = err.message
        res.status(400).json({ errors })
    }

}
// admin logout
module.exports.logout_get = (req, res) => {
    res.cookie('jwtAdmin', '', {
        maxAge: 1
    })
    res.redirect('/admin/login')
}

//------------------------ managing teacher functions
/// get teachers & students from db
module.exports.get_users = async function (req, res) {
    const role = req.body.role
    const model = getModel(role)
    let users
    try {
        if (role == "student") {
            users = await model.find().populate("classe");
        } else {
            users = await model.find()
        }
        console.log(users)

        res.json(users); // Send data as JSON response
    } catch (err) {
        res.status(500).json({ message: `Error fetching ${role}s`, err });
        console.log(err)
    }
}
// get modules from db 
module.exports.get_modules = async function (req, res) {


}
//delete a techer 
module.exports.delete_teacher = async function (req, res) {
    try {
        const result = await teacher.deleteOne({ _id: req.params.id })
        res.json(result); // Send data as JSON response
    } catch (err) {
        res.status(500).json({ message: 'Error fetching teachers', error: err });
    }

}
// made to fix classes etudiant propery that was null
module.exports.fix_classes = async function (req, res) {
    try {

        const classes = await classModel.find();

        for (const cl of classes) {
            let Students = await student.find({ classe: cl._id }).populate("classe")
            Students = Students.map(s => s._id);
            result = await classModel.updateOne(
                { _id: cl._id },
                { $addToSet: { students: { $each: Students } } }
            );
            console.log(Students)
        }
        res.status(200).json("done");
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};



//add a new matier
module.exports.add_matiere = async function (req, res) {

}

//add a new moduleEnseignier
module.exports.add_module = async function (req, res) {
    // this is one to work on
    let data = req.body.module
    const spe = data.classe.split(' ')[1]
    const niv = data.classe.split(' ')[0]
    const classid = await classModel.findOne({
        spécialité: spe,
        niveau: niv
    })
    data = classid ? { ...data, classe: classid._id } : data
    //  affect to a teacher
    await teacher.updateOne({ _id: data.teacher }, { $push: { classe: data.classe } })

    ModuleModel.create(data).then(result => {
        res.json(result)
        console.log(result)
    }).catch(err => {
        res.json(err)
        console.log(err)
    })

}

// get moduleEnseignier
module.exports.get_modules = async function (req, res) {
    const data = await ModuleModel.find().populate("classe").populate("teacher").populate("matiere")
    try {
        res.json(data)
        console.log(data)

    } catch (err) {
        res.json(err)
        console.log(err)

    }

}
function getModel(role) {
    if (role == "student") {
        return student
    }
    if (role == "teacher") {
        return teacher
    }
    if (role == "admin") {
        return Admin
    }
}


