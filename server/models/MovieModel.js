const mongoose = require('mongoose');

const movieModel = new mongoose.Schema(
    {
        name:{type:String},
        image:{type:String},
        genre:{type:String},
        duration:{type:String},
        format:{type:String},
        director_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Director', required: true},
        year:{type:String},
        actors: {type : Array , "default" : []},
        oscar:{type:String},
        timesBorrowed:{type:Number, "default" : 0}
    }
)

module.exports  = mongoose.model('Movie', movieModel, 'movies');