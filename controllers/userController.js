//Controller for user stuff

//Get user model
const User = require('../models/userModel')
const mongoose = require('mongoose')


//login user
const loginUser = async (req, res) => {
    res.json({mssg: 'login user'})
}

//signup user
const signupUser = async (req, res) => {
    res.json({mssg: 'sigunup user'})
}

module.exports = { signupUser, loginUser }