const router = require('express').Router()
const mongoose = require('mongoose')
const customerModel = require('../models/customerSchema')
const vehiculeModel = require('../models/vehiculeSchema')
const requireAuth = require('../Middleware/requireAuth')
const cron = require('node-cron');

router.use(requireAuth)

cron.schedule('* * * * * *', async () => {
    const activeCars = await vehiculeModel.find({activation_timer : {$gt : 0}})
    const carsPayement = activeCars.filter((car)=> car.status === 'active')
    const currentDate = new Date();
    for (const car of carsPayement) {
        if (currentDate >= car.next_payemnt) {
            const customer = await customerModel.findOne({_id : car.owner_ID})
            if(customer.balance < 900){
                await vehiculeModel.updateOne({_id:car._id},{$set:{status : 'disabled'}})
                await customerModel.updateOne({_id:customer._id},{$pull:{vehicules:car}})
                car.status = 'disabled'
                await customerModel.updateOne({_id:customer._id},{$push:{vehicules:car}})

            }else{
                const newBalance = customer.balance - car.plan
                console.log(newBalance)
                car.activation_timer -= 1;
                
                const nextPaymentDate = new Date(car.next_payemnt); 
                nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
                car.next_payemnt = nextPaymentDate;
                const carOld = await vehiculeModel.findOne({_id:car._id})
                await customerModel.updateOne({_id : customer._id},{$set:{balance : newBalance}})
                await customerModel.updateOne({_id:customer._id},{$pull:{vehicules:carOld}})
                await customerModel.updateOne({_id:customer._id},{$push:{vehicules:car}})
                await vehiculeModel.updateOne({_id:car._id},{$set:{activation_timer : car.activation_timer , next_payemnt : car.next_payemnt }})
                console.log(car.next_payemnt)
            }
            /*
          */
    
        }
      }
  });

router.post('/addDummyvehicule/:customerID', async (req,res)=>{
    try{
        const customer_id = req.params.customerID
        const carsNumber = await vehiculeModel.countDocuments()
        const vehicule = new vehiculeModel({
            _id: (carsNumber+1),
            name:"Partner B9",
            trackerModel:"FMB130",
            imei:"350612075061604",
            sim_number:"+213 542 91 56 30",
            matricule:"025689-113-05",
            num_chassis:"7jke05",
            activation_timer : 6,
            activation_date: Date.now(),
            owner_ID: customer_id,
            plan: 1300.00
        })
        await vehicule.save().then(
            console.log("vehicule saved",vehicule)
        )
        
       
        await customerModel.findByIdAndUpdate(customer_id,{$push : {vehicules : vehicule}})
        const customer = await customerModel.findById(customer_id)
        if(customer!==null){
            res.status(200).json({
                status:"Success",
                customer,
                vehicule
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
            message:err
        })
    }


})


router.post('/addvehicule/:customerID', async (req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const customer_id = req.params.customerID
        const customer1 = await customerModel.findById(customer_id)
        console.log(customer1)
        if(customer1 !==null){
            let injectedID = 0
            if(await vehiculeModel.countDocuments()>0){
                const lastID = await vehiculeModel.find().sort({_id:-1}).limit(1)
                console.log(lastID[0]._id)
                
                if(lastID[0]!== undefined){
                    injectedID = lastID[0]._id
                }
            }
            
            const vehicule = new vehiculeModel({
                _id: (injectedID+1),
                name:req.body.name,
                trackerModel:req.body.trackerModel,
                imei:req.body.imei,
                sim_number:req.body.sim_number,
                matricule:req.body.matricule,
                num_chassis:req.body.num_chassis,
                activation_timer : req.body.activation_timer,
                activation_date: new Date(req.body.activation_date),
                owner_ID: customer_id,
                plan: req.body.plan

            })
            await vehicule.save()
            if(!customer1.vehicules.includes(vehicule)){
                await customerModel.UpdateOne(
                    {_id : customer_id},
                    { $addToSet: { vehicules: vehicule } },
                    { session }
                );
            }
            
            await customerModel.findByIdAndUpdate(customer_id,{$inc : {vehicule_number : 1}})
            const customer = await customerModel.findById(customer_id)
            

            if(customer!==null){
                await session.commitTransaction();
                session.endSession();
                res.status(200).json({
                    status:"Success",
                    customer,
                    vehicule
                })
            }

        }else{
            await session.abortTransaction();
            session.endSession();

            res.status(404).json({
                status:"Failed",
                message:'unmatched ID'
            })
        }

    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        res.status(500).json({
            status:'failed',
            message:'server Error',
            error
        })
    }
    
})

router.get('/getvehicule/:id',async (req,res) =>{
    try{
        const id = req.params.id
        const vehicule = await vehiculeModel.findById(id)
        
        if(vehicule!==null){
            res.status(200).json({
                status:"Success",
                vehicule
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

router.get('/getallvehicules/',async (req,res) =>{
    try{
        const vehicule = await vehiculeModel.find()
        if(vehicule!==null){
            res.status(200).json({
                status:"Success",
                vehicules : vehicule
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

router.get('/getCustomersvehicules/:id',async (req,res) =>{
    try{
        const id = req.params.id
        const customer = await customerModel.findById(id)
        if(customer!==null){
            res.status(200).json({
                status:"Success",
                vehicules : customer.vehicules
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
            message: 'server Error'
        })
    }
    
})

router.put('/updatevehicule/:customerID/:id',async (req,res) =>{
    try{
        const id = req.params.id
        const customerId= req.params.customerID
        const oldversion = await vehiculeModel.findById(id)
        try {
            await customerModel.updateOne({_id:customerId},{$pull:{vehicules:{_id : oldversion._id}}})
        } catch (error) {
            res.status(500).json({
                status:'failed',
                message: err
            })
        }
        
        await vehiculeModel.findByIdAndUpdate(id,{$set : req.body,})
        
        const vehicule = await vehiculeModel.findById(id)
        await customerModel.updateOne({_id:customerId},{$push:{vehicules:vehicule}})
        const customer = await customerModel.findById(customerId)
        if(vehicule!==null){
            res.status(200).json({
                status:"Success",
                vehicule,
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

router.delete('/deletevehicule/:customerID/:id',async (req,res) =>{
    try{
        const id = req.params.id
        const customerID = req.params.customerID
        const vehicule = await vehiculeModel.findByIdAndDelete(id)
        await customerModel.updateOne({_id:customerID},{$pull:{vehicules:vehicule}})
        await customerModel.updateOne({_id:customerID},{$inc:{vehicule_number:-1}})
        if(vehicule!==null){
            res.status(200).json({
                status:"Success",
                vehicule
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