const router = require('express').Router()
const customerModel = require('../models/customerSchema')
const userModel= require('../models/userSchema')
const requireAuth = require("../Middleware/requireAuth")


router.use(requireAuth)

router.post('/createDummy',async (req,res)=>{
    try{
        const customersNumber = await customerModel.countDocuments()
        const newCustomer = new customerModel({
            _id: (customersNumber+1),
            name:'benfiala',
            phone:'+213 55 65 42 03',
            email:'EURLBenfiala@traxy.org'
        })
        await newCustomer.save()
        res.status(200).json({
            status:"Success",
            newCustomer
        })
    }catch(e){
        res.status(500).json({
            status:'failed',
            message:e
        })
    }
})


router.post('/createCustomer/:id',async(req,res)=>{
    try{
        const id = req.params.id
        const lastID = await customerModel.find().sort({_id:-1}).limit(1)
        console.log(lastID[0])
        let injectedID = 0
        if(lastID[0]!== undefined){
            injectedID = lastID[0]._id
        }
        const user = await userModel.findById(id)

        const newCustomer = new customerModel({
            _id: (injectedID+1) ,
            name: req.body.name,
            phone:req.body.phone,
            email : req.body.email,
            password: req.body.password,
            balance: req.body.balance,
            createdBy: user.username
        })

        await newCustomer.save()
        res.status(200).json({
            status:"Success",
            newCustomer
        })
    }catch(err){
        res.status(500).json({
            status:'failed',
            message: err
        })
    }
})


router.get('/single/:id',async(req,res)=>{
    try{
        const id= req.params.id
        const customer = await customerModel.findById(id)
        
        res.status(200).json({
            status:"Success",
            customer :customer
        })
    }catch(err){
        res.status(500).json({
            status:'failed',
            message: err
        })
    }
})

router.get('/all/:id',async(req,res)=>{
    try{
        const id = req.params.id
        const user = await userModel.findById(id)

        const customers = await customerModel.find({createdBy : user.username})
        
        res.status(200).json({
            status:"Success",
            customers
        })
    }catch(err){
        res.status(500).json({
            status:'failed',
            message: err
        })
    }
})

router.get('/all',async(req,res)=>{
    console.log(req.user.role)
    if(req.user.role === 'admin'){
        try{

            const customers = await customerModel.find()
            
            res.status(200).json({
                status:"Success",
                customers
            })
        }catch(err){
            res.status(500).json({
                status:'failed',
                message: err
            })
        }
    }else{
        try{

            const customers = await customerModel.find({createdBy : req.user.username})
            
            res.status(200).json({
                status:"Success",
                customers
            })
        }catch(err){
            res.status(500).json({
                status:'failed',
                message: err
            })
        }
    }
    
})


router.put('/single/:id',async(req,res)=>{
    try{
        const id = req.params.id
        await customerModel.findByIdAndUpdate(id,{$set : req.body,})
        const customer = await customerModel.findById(id)
        if(customer!==null){
            res.status(200).json({
                status:"Success",
                customer
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


router.delete('/single/:id',async (req,res) =>{
    try{
        const id = req.params.id
        const customer = await customerModel.findByIdAndDelete(id)
        if(customer!==null){
            res.status(200).json({
                status:"Success",
                customer :customer
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

module.exports = router;