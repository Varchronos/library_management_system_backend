const express = require('express')
const router = express.Router()
const controller = require('../controllers/user.controller')
const bookController = require('../controllers/book.controller')
const { registrationRules, validate, loginRules } = require('../middleware/validation.middleware')
const authenticationToken = require('../middleware/auth.middleware')
const isAdmin = require('../middleware/adminAuth.middleware')



//temp
// const Book = require('../models/books.model')
// router.get('/authorized', authenticationToken, (req, res) => {
//     const user = req.user;
//     res.json({ message: "authorized", user });
// })


router.get('/api/user', controller.getUser)
router.post('/api/register', registrationRules(), validate, controller.registerUser)
router.post('/api/login', controller.loginUser)
router.post('/api/books/add',authenticationToken, isAdmin,bookController.addBook)
router.get('/api/books/getAll', authenticationToken, bookController.getAllBooks)
router.get('/api/books/book/:id', authenticationToken, bookController.getBookById)
router.delete('/api/books/deleteById', authenticationToken, isAdmin,bookController.deleteBookById ) //query parameter used
router.put('/api/books/borrowBook', authenticationToken, bookController.borrowBook)
router.get('/api/books/showBorrowed', authenticationToken, bookController.showBorrowed)
router.put('/api/books/returnBook', authenticationToken, bookController.returnBook)
module.exports = router;