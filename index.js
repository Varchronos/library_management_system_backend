const express = require('express')
const mongoose = require('mongoose')
const app = express();
const cors = require('cors');
const user = require('./routes/user.route')
require('dotenv').config()
const mongostring = process.env.MONGODB_STRING
app.use(cors())
app.use(express.json())
app.use('/', user )
app.get('/', (req,res)=>{res.json({message:'welcome to page'})})

mongoose.connect(mongostring)
    .then(result => {
        console.log('connected to DB')
        app.listen(8080)
    })
    .catch(err => console.log(err))