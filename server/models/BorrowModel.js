import  mongoose  from "mongoose";

const borrowModel = new mongoose.Schema(
    {
        movie_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true},
        user_id:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        takenDate:{type:Date},
        broughtDate:{type:Date},
    }
)

export const Borrow = mongoose.model('Borrow', borrowModel);