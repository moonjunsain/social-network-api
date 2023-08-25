const mongoose = require('mongoose')
const reactionSchema = require('./Reaction')

const thoughtSchema = new mongoose.Schema(
    {
        thoughtText: { type: String, required: true },
        createdAt: {
            type: Date, 
            default: Date.now,
            get: (date) => date.toLocaleDateString()

        },
        username: { type: String, required: true },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)


// setting virtual
thoughtSchema.virtual('reactionCount').get(function(){
    if(this.reactions){
       return this.reactions.length
    }else {
        return 0
    }
})

const Thought = mongoose.model('thought', thoughtSchema)

module.exports = Thought