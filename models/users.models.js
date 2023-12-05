const mongoose = require('mongoose')
const schema = mongoose.Schema;


const usersSchema = new schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        userType: {
            type: String,
            required: true,
            default: 'normal'
        },
        borrowedBooks:[{type:schema.Types.ObjectId, ref:'Book'}],
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', usersSchema)