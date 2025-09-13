// bakend/controllers/authController.js


const User = require('../models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// For signup
const signup = async (req, res) => {
    try {
        const jwt_secret = process.env.JWT_SECRET;
        const { name, mail, password } = req.body
        console.log("Signup request:", name, mail, password)

        if (!name || !mail || !password) {
            return res.status(400).json({ message: "all fields are required" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "password must be at least 6 characters" })
        }

        const existinguser = await User.findOne({ email: mail })
        if (existinguser) {
            return res.status(400).json({ message: "user is already existed" })
        }

        const hashedpass = await bcrypt.hash(password, 10)
        const newuser = new User({ name: name, email: mail, password: hashedpass })
        await newuser.save()

        console.log("JWT secret at signup:", jwt_secret)
        const token = jwt.sign(
            { email: newuser.email, id: newuser._id },
            jwt_secret,
            { expiresIn: "1h" }
        )

        res.status(201).json({
            message: "new user",
            token,
            user: { id: newuser._id, name: newuser.name, email: newuser.email }
        })
    } catch (err) {
        console.error("Signup error:", err)
        res.status(500).json({ message: "server error" })
    }
}


// For login
const login = async (req, res) => {
    try {
        const jwt_secret = process.env.JWT_SECRET;
        const { mail, password } = req.body
        console.log("Login request:", mail, password)

        if (!mail || !password) {
            return res.status(400).json({ message: "all fields are required" })
        }

        const user = await User.findOne({ email: mail })
        if (!user) {
            return res.status(404).json({ message: "user is not registered" })
        }

        const comparepass = await bcrypt.compare(password, user.password)
        if (!comparepass) {
            return res.status(400).json({ message: "password is incorrect" })
        }

        console.log("JWT secret at login:", jwt_secret)
        const token = jwt.sign(
            { email: user.email, id: user._id },
            jwt_secret,
            { expiresIn: "1h" }
        )

        res.status(200).json({
            message: "login success",
            token,
            user: { id: user._id, name: user.name, email: user.email }
        })
    } catch (err) {
        console.error("Login error:", err)
        res.status(500).json({ message: "server error" })
    }
}

module.exports = { signup, login }
