const { Schema, model } = require('mongoose')

const userSchema =
    new Schema(
        {
            username: {
                type: String,
                required: true,
                trim: true
            },
            email: {
                type: String,
                required: true,
                unique: true,
                validate: {
                    validator: function (val) {
                        return /\S+@\S+\.\S+/.test(val)
                    },
                    message: 'That email does not look like an email at all'
                }
            },
            thoughts: {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            },
            friends: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },

        },
        {
            toJSON: {
                virtuals: true
            },
            id: false
        }
    )

const User = model('user', userSchema)



module.exports = User