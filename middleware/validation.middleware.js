const { body, validationResult } = require('express-validator');

const registrationRules =()=>[
    body('username').notEmpty().isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
    body('email').custom((value) => {
         if (!value.includes('@')){
            throw new Error('email')
         }
        return true;
        }).withMessage('Invalid email address'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
];

const loginRules = () => [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message:'THere is an error' });
    }
    next();
};

module.exports = {
    registrationRules,
    loginRules,
    validate,
};
