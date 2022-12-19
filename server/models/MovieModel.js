import  mongoose  from "mongoose";

const movieModel = new mongoose.Schema(
    {
        name:{type:String},
        image:{type:String},
        genre:{type:String},
        duration:{type:String},
        format:{type:String},
        director_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Director', required: true},
        year:{type:String},
        oscar:{type:String},
    }
)

export const Movie = mongoose.model('Movie', movieModel);