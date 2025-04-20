


const Student = require("../Models/StudantModel")
module.exports.Dashbord_get = async (req,res)=>{
    const stud = await Student.findById(req.user.id)
     res.send(`you are in the student dashbord , student : ${stud.nom}`);
}

