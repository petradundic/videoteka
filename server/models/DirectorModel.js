const mongoose = require('mongoose');

const directorModel = new mongoose.Schema(
    {
    name:{type:String},
    surname:{type:String, required: true},
    born:{type:Date},
    image:{type:String},
    }
);

module.exports = mongoose.model('Director', directorModel, 'directors'); 