const Book = require('../models/books.model')
const jwt = require('jsonwebtoken')
const jwt_secret_key = 'gvzEof7ZmfFbkn3lDLL8WrHITXwEejxvUUH8wYrIlhY='
const User = require('../models/users.models')
exports.addBook = (req, res, next) => {
    const bookName = req.body.bookName;
    const bookDesc = req.body.bookDesc;
    const availability = req.body.availability;
    const book = new Book({
        bookName: bookName,
        bookDesc: bookDesc,
        availability: availability,
        borrowerInfo: ''
    })
    book.save()
        .then(result => {
            console.log(result)
            res.json({ message: 'book added' })
        })
        .catch(err => {
            console.log(err);
            res.json({ error: err })
        })
}

exports.getAllBooks = (req, res) => {
    Book.find().then(book => {
        res.json({ BookList: book })
    }).catch(err => {
        console.log(err)
        res.json({ error: err })
    })
}

exports.getBookById = (req, res) => {
    const bookId = req.params.id;

    Book.findOne({ _id: bookId })
        .then(book => {
            if (book) {
                res.json({ message: 'book received', book })
            }
        })
        .catch(err => {
            console.log(err)
            res.json({ error: err })
        })
}


exports.deleteBookById = (req, res) => {
    const bookId = req.query.id;
    // console.log(bookId);
    Book.findOneAndDelete({ _id: bookId })
        .then((deletedBook) => {
            if (!deletedBook) {
                res.json({ error: 'Book not found' })
                return;
            }
            res.json({ message: `book was deleted`, deletedBook })
        })
        .catch(err => {
            console.log(err)
            res.json({ error: err })
        })
}

exports.borrowBook = async (req, res) => {
    const bookId = req.query.id;
    // console.log(bookId)  
    const token = req.headers.authorization.split(' ')[1]
    if (token) {
        try {
            const decoded = jwt.verify(token, jwt_secret_key);
            const userId = decoded.userId;

            //finding the book to borrow from datatbase
            const foundBook = await Book.findById(bookId);

            // if book is not found
            if (!foundBook) {
                throw new Error('Book not found');
            }

            // finding the current user from database
            const foundUser = await User.findById(userId);

            //if the user already has currently borrowed this book 
            if (foundUser.borrowedBooks.includes(bookId)) {
                return res.status(400).json({ message: 'book already borrowed by the user' })
            }

            // if the book is already borrowed by someone else
            if (!foundBook.availability) {
                return res.status(400).json({ error: 'book already borrowed by someone else!' })
            }

            // setting availability of book false and adding the entry to to user's borrowed books and then saving both changes.
            foundBook.availability = false;
            const bookstatus = await foundBook.save();
            if (!bookstatus) return res.json({ error: 'server error! couldnt borrow book' })

            foundUser.borrowedBooks.push(foundBook._id);
            const userBorrowStatus = await foundUser.save();
            if (!userBorrowStatus) return res.json({ error: 'server error! couldnt borrow book' })

            res.json({ message: 'Book borrowed successfully', foundBook });
        } catch (error) {
            console.error(error.message);
            res.status(404).json({ error: error.message });
        }
    }
}

exports.showBorrowed = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    if (token) {
        const decoded = jwt.verify(token, jwt_secret_key);
        const userId = decoded.userId;

        try {
            const foundUser = await User.findById(userId)
            if (foundUser) {
                res.status(201).json({ BookList: foundUser.borrowedBooks })
            }

        }
        catch (error) {
            return res.json({ error: 'Internal server error' })
        }
    }
}


exports.returnBook = async (req, res) => {
    const bookId = req.query.id;
    const token = req.headers.authorization.split(' ')[1]
    if (token) {
        const decoded = jwt.verify(token, jwt_secret_key);
        const userId = decoded.userId;

        try {
            const foundUser = await User.findById(userId)
            const foundBook = await Book.findById(bookId)
            if (!foundBook) return res.status(500).json({ error: 'could not find book' })

            const borrowedIndex = foundUser.borrowedBooks.findIndex(book => book.toString()===bookId)
            console.log(borrowedIndex)
            if (borrowedIndex === -1) return res.json({ error: 'Internal server error' })
            const newBorrowedArray = foundUser.borrowedBooks.filter((_, index) => index !== borrowedIndex)
        
            foundUser.borrowedBooks = newBorrowedArray;
            const updatedUser = await foundUser.save()
            if(!updatedUser)return res.json({error:'couldnt make changes, server error!'})

            foundBook.availability = true;
            const returnedBook = await foundBook.save()
            if (!returnedBook) return res.json({ error: 'couldnt return book, server error' })

            

            res.status(200).json({message:'book removed!!', foundBook})

        }
        catch (error) {
            console.log(error)
            return res.status(404).json({ error: error })
        }
    }
}