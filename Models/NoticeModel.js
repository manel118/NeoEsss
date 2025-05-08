
const mongoose = require("mongoose")


const NoticeSchema = new mongoose.Schema({
  titre : String,
  message: String,
  date: Date,
  distinataire : String ,// ou niveau
})

const NoticeModel = mongoose.model('schedule', NoticeSchema)
module.exports = NoticeModel
