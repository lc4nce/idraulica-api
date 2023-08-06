const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//
const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function (error, hashedPass) {
        if (error) {
            res.json({
                error
            })
        }
        let user = new User({
            fisrtname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedPass,
        })

        user.save()
            .then(user => {
                res.json({
                    message: 'user added!',
                })
            })
            .catch(error => {
                res.json({
                    message: 'An error occurred!',
                    error
                })
            })
    })
}

const login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, function (error, result) {
                    if (error) {
                        res.json({
                            error
                        })
                    }
                    if (result) {
                        let token = jwt.sign(
                            { name: user.name },
                            process.env.ACCESS_TOKEN_SECRET,
                            { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN },
                        )
                        let refreshtoken = jwt.sign(
                            { name: user.name },
                            process.env.REFRESH_TOKEN_SECRET,
                            { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN },
                        )
                        res.json({
                            message: 'login successful',
                            token: token,
                            refreshtoken: refreshtoken
                        })
                    } else {
                        res.json({
                            message: 'Incorrect password'
                        })
                    }
                })
            } else {
                res.json({
                    message: 'not found'
                })
            }
        })
}

const refreshToken = (req, res, next) => {
    const rt = req.body.refreshToken
    jwt.verify(rt, process.env.REFRESH_TOKEN_SECRET, function (error, decode) {
        if (error) {
            res.status(400).json({
                error
            })
        } else {
            let token = jwt.sign({ name: decode.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN })
            let refreshToken = req.body.refreshToken
            res.status(200).json({
                message: "token refreshed!",
                token,
                refreshToken
            })
        }
    })

}

module.exports = {
    register,
    login,
    refreshToken
}