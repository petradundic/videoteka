import mongoose from 'mongoose';


const actorModel = new mongoose.Schema(
    {
    name:{type:String},
    surname:{type:String, required: true},
    born:{type:Date},
    image:{type:String},
    }
);

export const Actor = mongoose.model('Actor', actorModel); 