import mongoose from 'mongoose';


const directorModel = new mongoose.Schema(
    {
    name:{type:String},
    surname:{type:String, required: true},
    born:{type:Date},
    image:{type:String},
    }
);

export const Director = mongoose.model('Director', directorModel); 