//Model for the user
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true //Need a unique email to sign up with that isn't already used
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)