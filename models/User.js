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
            thoughts: [{
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }],
            friends: [{
                type: Schema.Types.ObjectId,
                ref: 'user'
            }],

        },
        {
            toJSON: {
                virtuals: true,
               
            },
            id: false
        }
    )

// virtual
userSchema.virtual('friendCount').get(function(){
    if(this.friends){
        return this.friends.length
    }else {
        return 0
    }
})

const User = model('user', userSchema)

module.exports = User