const router = require('express').Router()
const userModel = require("../models/userSchema");
const jwt = require('jsonwebtoken')
require('dotenv').config()
const requireAuth = require('../Middleware/requireAuth')

router.use(requireAuth)

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

router.post('/newuser',async (req,res) =>{
    try{
        const usersNumber = await userModel.countDocuments()
        const newUser = new userModel({
            _id: (usersNumber+1),
            username:'USER1',
            NSS: 12354864323,
            password : '888888s3',
            boutique:'alger',
        })
        await newUser.save()
        res.status(200).json({
            status:"Success",
            newUser
        })
    }catch(e){
        res.status(500).json({
            status:'failed',
            message:e
        })
    }
})

router.post('/createNewUser',async(req,res)=>{
    try{
        const usersNumber = await userModel.countDocuments()
        
        /*console.log(lastID[0])*/
        let injectedID = 0
            if(await userModel.countDocuments()>0){
                const lastID = await userModel.find().sort({_id:-1}).limit(1)
                console.log(lastID[0]._id)
                
                if(lastID[0]!== undefined){
                    injectedID = lastID[0]._id
                }
            }
        const newUser = new userModel({
            _id: (injectedID+1),
            username: req.body.username,
            NSS:req.body.nss, 
            password : req.body.password,
            boutique:req.body.boutique,
        })
        console.log(newUser)
        await newUser.save()
        res.status(200).json({
            status:"Success",
            newUser
        })
    }catch(err){
        res.status(500).json({
            status:'failed',
            message: err
        })
    }
})

router.get('/userInfo/:id',async (req,res) =>{
    try{
        const id = req.params.id
        const user = await userModel.findById(id)
        if(user!==null){
            res.status(200).json({
                status:"Success",
                user
            })
        }else{
            res.status(404).json({
                status:"Failed",
                message:'unmatched ID'
            })
        }
        
    }catch(err){
        res.status(500).json({
            status:'failed',
            message: err
        })
    }
    
})

router.put('/updateUser/:id',async (req,res) =>{
    try{
        const id = req.params.id
        await userModel.findByIdAndUpdate(id,{$set : req.body,})
        const user = await userModel.findById(id)
        if(user!==null){
            res.status(200).json({
                status:"Success",
                user
            })
        }else{
            res.status(404).json({
                status:"Failed",
                message:'unmatched ID'
            })
        }
    }catch(err){
        res.status(500).json({
            status:'failed',
            message: err
        })
    }
    
})

router.delete('/deleteUser/:id',async (req,res) =>{
    try{
        const id = req.params.id
        const user = await userModel.findByIdAndDelete(id)
        if(user!==null){
            res.status(200).json({
                status:"Success",
                user
            })
        }else{
            res.status(404).json({
                status:"Failed",
                message:'unmatched ID'
            })
        }
    }catch(err){
        res.status(500).json({
            status:'failed',
            message: err
        })
    }
    
})

//for admin

router.get('/allusers',async (req,res) =>{
    try{
        const users = await userModel.find()
        if(users!==null){
            res.status(200).json({
                status:"Success",
                users
            })
        }else{
            res.status(404).json({
                status:"Failed",
                message:'Empty collection'
            })
        }
    }catch(err){
        res.status(500).json({
            status:'failed',
            message: err
        })
    }
    
})

module.exports = router;