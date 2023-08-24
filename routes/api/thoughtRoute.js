const router = require('express').Router()


router.route('/').get()

router.route('/:thoughtId').get().put().delete()

router.route('/:thoughtId/reactions')

router.route('/:thoughtId/:userId')

module.exports = router