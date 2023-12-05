const jwt = require('jsonwebtoken')
const jwt_secret_key = 'gvzEof7ZmfFbkn3lDLL8WrHITXwEejxvUUH8wYrIlhY='
const User = require('../models/users.models')


const isAdmin = async(req, res, next)=>{
    const token = req.headers.authorization.split(' ')[1]

    if(token){
        try{

            const decoded = jwt.verify(token,jwt_secret_key)
            const userId = decoded.userId;

            const foundUser = await User.findById(userId)
            if(!foundUser)return res.status(405).json({error:'user not found'})

            if(foundUser.userType === 'admin'){
                next();
            }
            else{
                res.status(401).json({error:'Unauthorized, Insufficient user privileges'})
            }
        }
        catch(error){
            console.log(error)
            res.status(404).json({error:'Internal server error'})
        }
    }
    else{
        return res.json({error:'timed out'})
    }
}

module.exports = isAdmin