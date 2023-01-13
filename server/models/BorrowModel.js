const mongoose = require('mongoose');

const borrowModel = new mongoose.Schema(
    {
        movie_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true},
        user_id:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        takenDate:{type:Date},
        returnDate:{type:Date}
    }
)

module.exports = mongoose.model('Borrow', borrowModel, 'borrows');