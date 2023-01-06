const mongoose = require('mongoose');
const ActorModel = require('./ActorModel');

const actormovieModel = new mongoose.Schema(
    {
        movie_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true},
        actor_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Actor', required: true},
    }
)

module.exports  = mongoose.model('ActorMovie', actormovieModel, 'actorMovies');