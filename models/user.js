const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    admin:{
        type: Boolean,
        required: true
    },
})

module.exports = mongoose.model('User', userSchema)