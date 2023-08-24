const {User} = require('../models/index')

// getting all users data
async function getUsers(req, res){
    try{
        const users = await User.find()
        res.status(200).json(users)
    }catch(err){
        res.status(500).json(err)
    }
}

async function getOneUser(req, res){
    try{
        const {userId} = req.params
        const user = await User.findOne({_id: userId}).select('-__v').populate(['thoughts', 'friends'])
        if(!user){
            return res.status(404).json({message: "No user found"})
        }

        res.status(200).json(user)

    }catch(err){
        res.status(500).json(err)
    }
}

async function makeNewUser(req, res){
    try{
        const newUser = await User.create(req.body)
        res.status(200).json({message: 'new user added ', newUser})
    }catch(err){
        res.status(500).json(err)
    }
}

async function deleteUser(req, res){
    try{
        const {userId} = req.params
        const user = await User.findOneAndRemove({_id: userId})
        
        if(!user){
            return res.status(404).json({message: 'user not found'})
        }

        res.status(200).json({message: 'succesfully deleted', deletedUser: user})

    }catch(err){
        res.status(500).json(err)
    }
}

// /api/users/:userId/friends/:friendId
async function addNewFriend(req, res){
    try{
        const {userId, friendId} = req.params
        const friend = await User.findOne({_id: friendId})

        if(!friend){
            return res.status(404).json({message: 'Cant add friend, user not found'})
        }

        const user = await User.findOneAndUpdate(
            {_id: userId},
            {$addToSet: {friends: friendId}},
            {runValidators: true, new: true}
        )

        if(!user){
            return res.status(404).json({message: 'No user found'})
        }

    }catch(err){
        res.status(500).json(err)
    }
}

async function deleteFriend(req, res){
    try{
        const {userId, friendId} = req.params
        const friend = await User.findOne({_id: friendId})

        if(!friend){
            return res.status(404).json({message: 'Cant delete friend, user not found'})
        }

        const user = await User.findOneAndUpdate(
            {_id: userId},
            {$pull: {friends: friendId}},
            { runValidators: true, new: true }
        )

        if(!user){
            return res.status(404).json({message: 'no user found'})
        }

        res.status(200).json({message: 'successful delete', user})
    }catch(err){
        res.status(500).json(err)
    }
}

module.exports = {
    getUsers,
    getOneUser,
    makeNewUser,
    deleteUser,
    addNewFriend,
    deleteFriend
}