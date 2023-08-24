const {Thought, User} = require('../models/index')

async function getThoughts(req, res){
    try{
        const thoughts = await Thought.find()

        res.status(200).json(thoughts)
    }catch(err){
        res.status(500).json(err)
    }
}
async function getOneThought(req, res){
    try{
        const {thoughtId} = req.params
        const thought = await Thought.findById(thoughtId)

        if(!thought){
            return res.status(404).json({message: 'thought not found'})
        }

        res.status(200).json(thought)

    }catch(err){
        res.status(500).json(err)
    }
}
async function makeNewThought(req, res){
    try{
        // form the body like this:
        // {
        //     userId : 'userid',
        //     thought: {
        //         thoughtText: 'thought text',
        //         reactions: [
        //             {
        //                 reactionBody: 'asdf',
        //                 username: 'username'
        //             }
        //         ]
        //     }
        // }
        const userCheck = await User.findById(req.body.userId)

        if(!userCheck){
            return res.status(404).json({message: 'user not existing'})
        }

        req.body.thought.username = userCheck.username

        const thought = await Thought.create(req.body.thought)
        console.log(thought._id)

        const user = await User.findOneAndUpdate(
            {_id: req.body.userId},
            {$addToSet: {thoughts: thought._id}},
            {new: true}
        )


        res.status(200).json({message: 'created a new thought', thought, user})
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}
async function updateThought(req, res){
    try{
        const {thoughtId} = req.params
        const thought = await Thought.findOneAndUpdate(
            {_id: thoughtId},
            req.body,
            {new: true, runValidators: true}
        )
        
        if(!thought){
            return res.status(404).json({message: 'thought not found'})
        }

        res.status(200).json({message: 'updated thought', thought})

    }catch(err){
        res.status(500).json(err)
    }
}
async function deleteThought(req, res){
    try{
        const {thoughtId, userId} = req.params
        const thought = await Thought.findOneAndRemove({_id: thoughtId})

        if(!thought){
            return res.status(404).json({message: 'thought not found'})
        }

        const user = await User.findOneAndUpdate(
            {_id: userId},
            {$pull: {thoughts: thought._id}},
            {new: true}
        )

        if(!user){
            return res.status(404).json({message: 'user not found'})
        }

        res.status(200).json({message: 'deleted', thought, user})

    }catch(err){
        res.status(500).json(err)
    }
}

// /api/thoughts/:thoughtId/reactions
async function createReaction(req, res){
    try{
        const {thoughtId} = req.params
        const thought = await Thought.findOneAndUpdate(
            {_id: thoughtId},
            {$push: {reactions: req.body}},
            {new: true}
        )

        if(!thought){
            return res.status(404).json({message: 'thought not found'})
        }

        res.status(200).json({message: 'reaction added', thought})

    }catch(err){
        res.status(500).json(err)
    }
}

// /api/thoughts/:thoughtId/reactions/:reactionId
async function deleteReaction(req, res){
    try{
        console.log('route hit')
        const {thoughtId, reactionId} = req.params
        const thought = await Thought.findOneAndUpdate(
            {_id: thoughtId},
            {$pull: {reactions: {reactionId: reactionId}}},
            {new: true}
        )

        if(!thought){
            return res.status(404).json({message: 'thought not found'})
        }

        res.status(200).json({message: 'reaction deleted', thought})

    }catch(err){
        res.status(500).json(err)
    }
}

module.exports = {
    getThoughts,
    getOneThought,
    makeNewThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
}