const mongoose = require('mongoose')
const schema = mongoose.Schema;
const booksSchema = new schema(
    {
        bookName:{
            type:String, 
            required: true,
        },
        bookDesc:{
            type:String,
            required: true,
        },
        availability:{
            type:Boolean,
            required: true,
        },
        imageUrl:{
            type: String,
            required: false,
        },
        borrowerInfo:{
            type:String,
            required: false,
        },
        
    }
)

module.exports = mongoose.model('Book', booksSchema)
