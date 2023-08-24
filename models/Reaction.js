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
        get: getFormattedDate
    }
})

// sets the method for formatting date
function getFormattedDate(createdDate){
    const date = new Date(createdDate)
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    return formattedDate
}

module.exports = reactionSchema