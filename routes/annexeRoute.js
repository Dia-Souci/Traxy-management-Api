const router = require('express').Router()
const customerModel = require('../models/customerSchema')
const annexeModel = require('../models/annexeSchema')
const vehiculeModel = require('../models/vehiculeSchema')
const requireAuth = require('../Middleware/requireAuth')


router.use(requireAuth)



router.post('/addDummyannexe/:customerID', async (req,res)=>{
    try {
        const customer_id = req.params.customerID
        const numberofAnnexes = await annexeModel.countDocuments()
        const annexe = new annexeModel({
            _id: (numberofAnnexes+1),
            renouvelement :false,
            nouveau_abonnement :true,
            n_compte_client : '022214500786z1',
            code_vendeur:12033354,
            raison_sociale :'Eurl Benfialla',
            tel:'0555846255',
            nom_prenom:'Benfiala hmitchou',
            passeport:true,
            n_piece_identite:'901522',
            date_emition_carte_national:Date.now(),
            lieu_emission_carte_national:'Batna',
            nombredegpsactuelle: 10,
            nombredegpsajouter: 3,
            nombredegpstotall: 13,
            
            nom_prenom_signature:'Benfiala hmitchou',
            fonction_signature:'gérant',
            
            user_name:'Youcef',

        })
        await annexe.save().then(
            console.log("annexe saved",annexe)
        )

        await customerModel.findByIdAndUpdate(customer_id,{$push : {annexes : annexe}})
        const customer = await customerModel.findById(customer_id)
        if(customer!==null){
            res.status(200).json({
                status:"Success",
                customer,
                annexe
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
router.get('/get/:id',async (req,res)=>{
    const customer_id = req.params.id
    const NewVehicules = await vehiculeModel.find({owner_ID:customer_id , new:true})
    console.log(NewVehicules)
})

router.post('/addannexe/:customerID', async (req,res)=>{
    try {
        const customer_id = req.params.customerID
        let injectedID = 0
            if(await annexeModel.countDocuments()>0){
                const lastID = await annexeModel.find().sort({_id:-1}).limit(1)
                console.log(lastID[0]._id)
                
                if(lastID[0]!== undefined){
                    injectedID = lastID[0]._id
                }
            }
        const annexe = new annexeModel({
              _id: (injectedID+1),
              renouvelement :req.body.renouvelement,
              nouveau_abonnement :req.body.nouveau_abonnement,
              n_compte_client : req.body.n_compte_client,
              code_vendeur:req.body.code_vendeur,
              boutique:req.body.boutique,
              raison_sociale :req.body.raison_sociale,
              tel:req.body.tel,
              nom_prenom:req.body.nom_prenom,
              representation_legale:req.body.representation_legale,
              mondataire:req.body.mondataire,
              cni:req.body.cni,
              passeport:req.body.passeport,
              delegation_mondat:req.body.delegation_mondat,
              n_piece_identite:req.body.n_piece_identite,
              date_emition_carte_national:new Date(req.body.date_emition_carte_national),
              lieu_emission_carte_national:req.body.lieu_emission_carte_national,
              bon_commande: req.body.bon_commande,
              autre_a_preciser: req.body.autre_a_preciser,
              nombredegpsactuelle: req.body.nombredegpsactuelle,
              nombredegpsajouter: req.body.nombredegpsajouter,
              nombredegpstotall: req.body.nombredegpstotall,
              offre_basic: req.body.offre_basic,
              offre_standard: req.body.offre_standard,
              offre_professionel: req.body.offre_professionel,
              nom_prenom_signature:req.body.nom_prenom_signature,
              fonction_signature:req.body.fonction_signature,
              
              user_name:req.body.user_name,
              fonction_signature_user:req.body.fonction_signature_user,

        })
        await annexe.save().then(
            console.log("annexe saved")
        )
        const NewVehicules = await vehiculeModel.find({owner_ID:customer_id , new:true}).then(
            console.log("found vehicules")
        )
        const updated = await annexeModel.findByIdAndUpdate(annexe._id,{$set : {vehicules : NewVehicules}}).then(
            console.log("vehicules inserted in annexe")
        )
        await vehiculeModel.updateMany({owner_ID:customer_id}, {$set:{new:false}}).then(
            console.log("new was set to false")
        )
        await customerModel.findByIdAndUpdate(customer_id,{$push : {annexes : annexe}}).then(
            console.log("annexe is pushed in customer document")
        )
        
        await customerModel.updateMany(
            { "_id": customer_id },
            { $set: { 'vehicules.$[elem].new': false } },{
                arrayFilters: [{ "elem.new": true }]
             }).then(
                console.log("customer document updated status")
            )
        const customer = await customerModel.findById(customer_id)
        if(customer!==null){
            res.status(200).json({
                status:"Success",
                customer,
                annexe
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



router.get('/getannexe/:id',async (req,res) =>{
    try{
        const id = req.params.id
        const annexe = await annexeModel.findById(id)
        console.log(annexe)
        if(annexe!==null){
            res.status(200).json({
                status:"Success",
                annexe
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

router.get('/getCustomersannexes/:id',async (req,res) =>{
    try{
        const id = req.params.id
        const customer = await customerModel.findById(id)
        console.log(customer)
        if(customer!==null){
            res.status(200).json({
                status:"Success",
                Annexes : customer.annexes
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

router.put('/updateannexe/:customerID/:id',async (req,res) =>{
    try{
        const id = req.params.id
        const customerId= req.params.customerID
        const oldversion = await annexeModel.findByIdAndUpdate(id,{$set : req.body,})
        await customerModel.updateOne({_id:customerId},{$pull:{annexes:oldversion}})
        const annexe = await annexeModel.findById(id)
        await customerModel.updateOne({_id:customerId},{$push:{annexes:annexe}})
        const customer = await customerModel.findById(customerId)
        console.log(annexe)
        if(annexe!==null){
            res.status(200).json({
                status:"Success",
                annexe,
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

router.delete('/deleteannexe/:customerID/:id',async (req,res) =>{
    try{
        const id = req.params.id
        const customerID = req.params.customerID
        const annexe = await annexeModel.findByIdAndDelete(id)
        await customerModel.updateOne({_id:customerID},{$pull:{annexes:annexe}})

        if(annexe!==null){
            res.status(200).json({
                status:"Success",
                annexe
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