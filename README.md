# library_management_system_backend
Backend for the Library Management System project

## Features
1. **User Panel:**
   - Create an account ![icon](https://img.shields.io/badge/account-Create-brightgreen?style=flat-square)
   - Borrow books ![icon](https://img.shields.io/badge/books-Borrow-blue?style=flat-square)
   - Return books ![icon](https://img.shields.io/badge/books-Return-brightgreen?style=flat-square)

2. **Admin Panel:**
   - Access features similar to the user panel ![icon](https://img.shields.io/badge/features-Access-blueviolet?style=flat-square)
   - Add books ![icon](https://img.shields.io/badge/books-Add-orange?style=flat-square)
   - Remove books ![icon](https://img.shields.io/badge/books-Remove-red?style=flat-square)

3. **Book Borrowing Restrictions:**
   - Users cannot borrow books already borrowed by themselves or others ![icon](https://img.shields.io/badge/restrictions-No%20Double%20Borrowing-lightgrey?style=flat-square)

4. **Authentication:**
   - Authentication required for every activity ![icon](https://img.shields.io/badge/authentication-Required-ff69b4?style=flat-square)
   - Users cannot perform any action without authentication ![icon](https://img.shields.io/badge/authentication-Required-ff69b4?style=flat-square)

## Technologies Used

**Backend:**

[![NodeJS](https://img.shields.io/badge/NodeJS-14.x-brightgreen?style=flat-square&logo=node.js)](https://nodejs.org/)   
[![Express](https://img.shields.io/badge/Express-4.x-blue?style=flat-square&logo=express)](https://expressjs.com/)
[![JWT](https://img.shields.io/badge/JWT-latest-orange?style=flat-square&logo=json-web-tokens)](https://jwt.io/)    
[![dotenv](https://img.shields.io/badge/dotenv-latest-yellow?style=flat-square&logo=npm)](https://www.npmjs.com/package/dotenv)   
[![MongoDB](https://img.shields.io/badge/MongoDB-latest-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)   
[![Mongoose](https://img.shields.io/badge/Mongoose-latest-success?style=flat-square&logo=mongoose)](https://mongoosejs.com/)   
[![Cors](https://img.shields.io/badge/Cors-latest-blueviolet?style=flat-square&logo=mozilla-firefox-browser)](https://www.npmjs.com/package/cors)

**Frontend:**

   [![ReactJS](https://img.shields.io/badge/ReactJS-latest-blue?style=flat-square&logo=react)](https://react.dev/)
   [![NextJS](https://img.shields.io/badge/NextJS-latest-success?style=flat-square&logo=next.js)](https://nextjs.org/)
   [![Axios](https://img.shields.io/badge/Axios-latest-informational?style=flat-square&logo=axios)](https://axios-http.com/)
   [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-latest-blueviolet?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

**Testing Tools:**

[![Postman](https://img.shields.io/badge/Postman-latest-orange?style=flat-square&logo=postman)](https://www.postman.com/)

## Deployment

Not deployed yet, work in progress

## Documentation Links

- [NodeJS Documentation](https://nodejs.org/documentation/)
- [Express Documentation](https://expressjs.com/en/4x/api.html)
- [JWT Documentation](https://jwt.io/introduction/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [ReactJS Documentation](https://reactjs.org/docs/getting-started.html)
- [NextJS Documentation](https://nextjs.org/docs/getting-started)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Postman Documentation](https://learning.postman.com/docs/)


# API Endpoint Documentation

## Overview

This documentation provides a quick reference guide for the API endpoints in the backend project. The API is built using Node.js, Express, and MongoDB.

## Endpoints

### 1. User Routes

- **Register User**
  - Endpoint: `POST /api/register`
  - Description: Registers a new user.
  - Request Body:
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string",
      "userType": "string"
    }
    ```
- **Login User**
  - Endpoint: `POST /api/login`
  - Description: Authenticates a user and returns a token.
  - Request Body:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```

### 2. Book Routes

- **Add Book**
  - Endpoint: `POST /api/books/add`
  - Description: Adds a new book to the system.
  - Request Body:
    ```json
    {
      "bookName": "string",
      "bookDesc": "string",
      "availability": "boolean",
      "imageUrl": "string"
    }
    ```
- **Get All Books**
  - Endpoint: `GET /api/books/getAll`
  - Description: Retrieves a list of all books in the system.

- **Get Book by ID**
  - Endpoint: `GET /api/books/book/:id`
  - Description: Retrieves details of a specific book by ID.

- **Delete Book by ID**
  - Endpoint: `DELETE /api/books/deleteById?id=<bookId>`
  - Description: Deletes a book from the system by ID.

- **Borrow Book**
  - Endpoint: `PUT /api/books/borrowBook?id=<bookId>`
  - Description: Borrows a book for the authenticated user.

- **Show Borrowed Books**
  - Endpoint: `GET /api/books/showBorrowed`
  - Description: Retrieves a list of books borrowed by the authenticated user.

- **Return Book**
  - Endpoint: `PUT /api/books/returnBook?id=<bookId>`
  - Description: Returns a borrowed book.

## Notes

- All endpoints require proper authentication using a valid token.
- Admin privileges are required for certain endpoints.
- Use appropriate HTTP methods for each endpoint (POST, GET, DELETE, PUT).



## Authors

- **Varchronos** - *FrontEnd Developer* - [GitHub Profile](https://github.com/Varchronos)

## Acknowledgments

- will be updating
