const mongoose =require("mongoose")
const { countDocuments } = require("./TeacherModel")


const AdminSchema = new mongoose.Schema({
    username :String,
    cours: [{type: mongoose.Schema.Types.ObjectId, ref: 'module'}], // références aux cours assurés
    // emploiDuTemps: [ObjectId] // référence à la collection EmploiDuTemps
  })

const AdminModel = mongoose.model('admin',AdminSchema)
module.exports = AdminModel
