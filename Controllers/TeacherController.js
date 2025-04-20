// class_get
// cour_get , cour_post
// gestion_note_get , gestion_note_post  (class, module, )
//notification_get

const Teacher = require("../Models/TeacherModel")

module.exports.Dashbord_get = async (req,res)=>{
 res.send("you are in the teacher dashbord")
}

