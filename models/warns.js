const mongoose = require('mongoose')
const warns = new mongoose.Schema({
    usuario: String,
    motivo: Array
})
module.exports = mongoose.model('warns', warns)