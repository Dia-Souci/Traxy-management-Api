const router = require('express').Router()
const customerModel = require('../models/customerSchema')
const interventionModel = require('../models/interventionSchema')
const requireAuth = require('../Middleware/requireAuth')


router.use(requireAuth)


router.post('/addDummyintervention/:customerID', async (req,res)=>{
    try {
        const customer_id = req.params.customerID
        const intervention = new interventionModel({
            intervention_report:'Intervention report Content',
            intervention_date:Date.now()
        })
        await intervention.save().then(
            console.log("intervention saved",intervention)
        )

        await customerModel.findByIdAndUpdate(customer_id,{$push : {interventions : intervention}})
        const customer = await customerModel.findById(customer_id)
        if(customer!==null){
            res.status(200).json({
                status:"Success",
                customer,
                intervention
            })
        }else{
            res.status(404).json({
                status:"Failed",
                message:'unmatched ID'
            })
        }

    } catch (error) {
        res.status(500).json({
            status:'failed',
            message:error
        })
    }
    
})

router.post('/addintervention/:customerID', async (req,res)=>{
    try {
        const customer_id = req.params.customerID
        const intervention = new interventionModel({
            intervention_report:req.body.intervention_report,
            intervention_date:new Date(req.body.intervention_date)

        })
        await intervention.save().then(
            console.log("intervention saved",intervention)
        )

        await customerModel.findByIdAndUpdate(customer_id,{$push : {interventions : intervention}})
        const customer = await customerModel.findById(customer_id)
        if(customer!==null){
            res.status(200).json({
                status:"Success",
                customer,
                intervention
            })
        }else{
            res.status(404).json({
                status:"Failed",
                message:'unmatched ID'
            })
        }

    } catch (error) {
        res.status(500).json({
            status:'failed',
            message:error
        })
    }
    
})

router.get('/getintervention/:id',async (req,res) =>{
    try{
        const id = req.params.id
        const intervention = await interventionModel.findById(id)
        if(intervention!==null){
            res.status(200).json({
                status:"Success",
                interventions :intervention
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

router.get('/getCustomersinterventions/:id',async (req,res) =>{
    try{
        const id = req.params.id
        const customer = await customerModel.findById(id)
        console.log(customer)
        if(customer!==null){
            res.status(200).json({
                status:"Success",
                interventions : customer.interventions
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

router.put('/updateintervention/:customerID/:id',async (req,res) =>{
    try{
        const id = req.params.id
        const customerId= req.params.customerID
        const oldversion = await interventionModel.findByIdAndUpdate(id,{$set : req.body,})
        await customerModel.updateOne({_id:customerId},{$pull:{interventions:oldversion}})
        const intervention = await interventionModel.findById(id)
        await customerModel.updateOne({_id:customerId},{$push:{interventions:intervention}})
        const customer = await customerModel.findById(customerId)
        console.log(intervention)
        if(intervention!==null){
            res.status(200).json({
                status:"Success",
                intervention,
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

router.delete('/deleteintervention/:customerID/:id',async (req,res) =>{
    try{
        const id = req.params.id
        const customerID = req.params.customerID
        const intervention = await interventionModel.findByIdAndDelete(id)
        await customerModel.updateOne({_id:customerID},{$pull:{interventions:intervention}})

        if(intervention!==null){
            res.status(200).json({
                status:"Success",
                intervention
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