const mongoose = require('mongoose');


const actorModel = new mongoose.Schema(
    {
    name:{type:String},
    surname:{type:String, required: true},
    born:{type:Date},
    image:{type:String},
    }
);

module.exports  = mongoose.model('Actor', actorModel, 'actors'); 