const mongoose =require("mongoose")


const Courshema = new mongoose.Schema({
    title: String,
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'subject' },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'teacher' },
    classe: { type: mongoose.Schema.Types.ObjectId, ref: 'class' },
    date: Date,
    content: String
  });
  
  module.exports = mongoose.model('cour', Courshema)