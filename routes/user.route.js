const express = require('express')
const router = express.Router()
const controller = require('../controllers/user.controller')
const { registrationRules, validate, loginRules } = require('../middleware/validation.middleware')



router.get('/api/user', controller.getUser)
router.post('/api/register',registrationRules(), validate, controller.registerUser)
router.post('/api/login',controller.loginUser )

module.exports = router;