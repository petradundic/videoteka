const mongoose = require('mongoose');

const userModel = new mongoose.Schema(
    {
        name:{type: String},
        surname:{type: String},
        username:{type: String},
        email:{type: String},
        password:{type:String},
        role:{type:String}

    }
)

module.exports = mongoose.model('User', userModel, 'users')