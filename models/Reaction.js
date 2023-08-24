const mongoose = require('mongoose')

// setting schema
const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: mongoose.Schema.ObjectId,
        default: new mongoose.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => date.toLocaleDateString()
    }
})
module.exports = reactionSchema