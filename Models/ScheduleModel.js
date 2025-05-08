
const mongoose = require("mongoose")


const ScheduleSchema = new mongoose.Schema({
  jour: { type: String, enum: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'] },
  heure: String,
  salle: String,
  module: { type: mongoose.Schema.Types.ObjectId, ref: 'module' },
  seance : {
    type: [String],
    enum: ['cour', 'td', 'tp'],
    required: true
  } ,
  academicYear: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear' , required : true },
},{ timestamps: true })

const scheduleModel = mongoose.model('schedule', ScheduleSchema)
module.exports = scheduleModel
