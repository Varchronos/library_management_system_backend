
const User = require('../models/users.models')
const jwt = require('jsonwebtoken')


const jwt_secret_key = 'gvzEof7ZmfFbkn3lDLL8WrHITXwEejxvUUH8wYrIlhY='

exports.getUser = (req, res, next) => {
    res.status(200).json({
        name: 'Dhruv',
        password: 'hello world'
    })
}

exports.registerUser = (req, res, next) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const userType = 'normal';
    const user = new User({
        username: username,
        email: email,
        password: password,
        userType: userType
    })
    user.save()
        .then(result => {
            console.log(result)
            const token = jwt.sign({ userId: result._id, username: result.username }, jwt_secret_key, { expiresIn: '1h' })
            res.status(201).json({
                message: 'user created',
                user: result,
                token: token,
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
}

exports.loginUser = (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email: email, password: password })
        .then(user => {
            if (!user) {
                res.status(401).json({ message: "Invalid credentials" })
                return;
            }

            const token = jwt.sign({ userId: user._id, email: user.email }, jwt_secret_key, { expiresIn: '1h' });
            res.status(200).json({
                message: 'successfull login',
                user: user,
                token: token,
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err.message || 'Internal Server Error' })
        })
}