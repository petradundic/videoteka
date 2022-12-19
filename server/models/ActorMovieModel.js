import  mongoose  from "mongoose";

const actormovieModel = new mongoose.Schema(
    {
        movie_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true},
        actor_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Actor', required: true},
    }
)

export const ActorMovie = mongoose.model('ActorMovie', actormovieModel);