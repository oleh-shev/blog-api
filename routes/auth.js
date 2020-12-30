const express = require('express');
const router = express.Router();
const {body} = require('express-validator/check');
const User = require('../models/user');
const authController = require('../controllers/auth');

router.put(
    '/signup',
    [
        body('email')
            .isEmail()
            .withMessage('Invalid Email')
            .custom((value, {req}) => {
                return User.findOne({email: value})
                    .then(user => {
                        if (user) {
                            return Promise.reject('Email already exists');
                        }
                    });
            })
            .normalizeEmail(),
        body('password')
            .trim()
            .isLength({min: 5}),
        body('name')
            .trim()
            .not()
            .isEmpty()
    ],
    authController.signup
);

router.post('/login', authController.login);

module.exports = router;
