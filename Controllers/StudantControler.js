//log-in
//consult


const Student = require("../Models/StudantModel")

module.exports.Dashbord_get = async (req,res)=>{
    const stud = await Student.findById(req.user.id)
     res.render("esp-Etu")
     console.log(`you are in the student dashbord , student : ${stud.nom}`)
}

module.exports.get_login = async (req,res)=>{
    res.send("you are in the student login page")
   }

