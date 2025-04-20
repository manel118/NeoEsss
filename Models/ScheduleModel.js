
const mongoose = require("mongoose")


const ScheduleSchema = new mongoose.Schema({
  jour: String,
  heur: String,
  salle: String,
  cours: Stirng,
  enseignant: String,
  semester: String,
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'class' } // ou niveau
})

const scheduleModel = mongoose.model('schedule', ScheduleSchema)
module.exports = scheduleModel
