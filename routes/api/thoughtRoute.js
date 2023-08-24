const router = require('express').Router()

const {
    getThoughts,
    getOneThought,
    makeNewThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction

} = require('../../controllers/thoughtController')


router.route('/').get(getThoughts).post(makeNewThought)

router.route('/:thoughtId').get(getOneThought).put(updateThought)

router.route('/:thoughtId/reactions').post(createReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)

router.route('/:thoughtId/:userId').delete(deleteThought)

module.exports = router