const router = require('express').Router()
const userModel = require("../models/userSchema");
const jwt = require('jsonwebtoken')
require('dotenv').config()


const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

router.post("/login", async (req, res) => {
    const {username,password} = req.body
    try {
        const user = await userModel.login(username, password)
    
        // create a token
        const token = createToken(user._id)
        const ID = user._id
        const role = user.role
        const nss = user.NSS
    
        res.status(200).json({username, ID , role , nss , token})
      } catch (error) {
        res.status(400).json({error: error.message})
      }
  });

module.exports = router;