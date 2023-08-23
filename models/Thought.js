const mongoose = require('mongoose')
const reactionSchema = require('./Reaction')

const thoughtSchema = new mongoose.Schema(
    {
        thoughtText: { type: String, required: true },
        createdAt: {
            type: Date, 
            default: Date.now,
            get: getFormattedDate

        },
        username: { type: String, required: true },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
)

// sets the method for formatting date
function getFormattedDate(createdDate){
    const date = new Date(createdDate)
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    return formattedDate
}

// setting virtual
thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length
})

const Thought = mongoose.model('thought', thoughtSchema)

module.exports = Thought