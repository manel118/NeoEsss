// login
// class_get
// cour_get , cour_post
// gestion_note_get , gestion_note_post  (class, module, )
//notification_get

const Teacher = require("../Models/TeacherModel")

module.exports.get_login = async (req,res)=>{
  console.log(req.cookies)

  if (req.user)
      res.redirect("/teacher/dashboard") // render
  else
      res.render("index") // render
   }
   

module.exports.Dashbord_get = async (req,res)=>{
  if(req.user){
    const teacher = await Teacher.findById(req.user.id).populate()
    // const Numcour = getNumCour(teacher._id)
    res.render("esp-Ens",{teacher})
  console.log(` teacher : ${teacher}`);
}else{
   res.redirect("/login") 
}

}
async function getNumCour(id){
//  const toutmodule =  await module.find({teacher : id}) // every module he teaches
}

module.exports.get_classes = async (req,res)=>{

}

//logout
module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', {
      maxAge: 1
  })
  res.redirect('/login')
}
