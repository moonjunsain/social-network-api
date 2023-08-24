const router = require('express').Router()

const {
    getUsers,
    getOneUser,
    makeNewUser,
    deleteUser,
    addNewFriend,
    deleteFriend,
    updateUser
} = require('../../controllers/userController')

router.route('/').get(getUsers).post(makeNewUser)

router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser)

router.route('/:userId/friends/:friendId').post(addNewFriend).delete(deleteFriend)


module.exports = router 
