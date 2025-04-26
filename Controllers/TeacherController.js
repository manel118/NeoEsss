// login
// class_get
// cour_get , cour_post
// gestion_note_get , gestion_note_post  (class, module, )
//notification_get

const Teacher = require("../Models/TeacherModel")

module.exports.get_login = async (req,res)=>{
    res.send("you are in the teacher login page")
   }
   

module.exports.Dashbord_get = async (req,res)=>{
    const teacher = await Teacher.findById(req.user.id)
    res.render("esp-Ens")
  console.log(` teacher : ${teacher}`);

}

