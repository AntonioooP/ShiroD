const mongoose = require('mongoose')
const canal = new mongoose.Schema({
    Guild: String,
    Canal: String,
    Autor: String,
})
module.exports = mongoose.model('canal', canal)