const router = require('express').Router()
const customerModel = require('../models/customerSchema')
const contractModel = require('../models/contractSchema')
const requireAuth = require('../Middleware/requireAuth')


router.use(requireAuth)


router.post('/addDummycontract/:customerID', async (req,res)=>{
    try {
        const customer_id = req.params.customerID
        const numberOfContracts = await contractModel.countDocuments()
        const contract = new contractModel({
            _id: (numberOfContracts+1),
            renouvelement :false,
            nouveau_abonnement :true,
            n_compte_client : '022214500786z1',
              code_vendeur:12033354,
              raison_sociale :'Eurl Benfialla',
              eurl:true,
              n_registre_commerce:'1505ZA099882S5',
              date_creation_rc: Date.now(),
              n_identite_fiscale:'05223148955647',
              n_article_imposition:'2103566647800013',
              adresse:'Adresse batna N° batiment 130 residence Traxy , batna ,Algérie',
              code_postal:'05000',
              commune:'Batna',
              wilaya:'Batna',
              tel:'0555846255',
              fax:'033225566',
              e_mail:'dummy@traxy.org',
              n_compte_bancaire:'450213117050',
              nom_banque:'CPA',
              agence:'14',
              adresse_banque:'Ecotec,Batna,Algérie',
              nom_prenom:'Benfiala hmitchou',
              date_naissance:Date.now(),
              nationalite:'Algérienne',
              passeport:true,
              n_piece_identite:'901522',
              date_emition_carte_national:Date.now(),
              lieu_emission_carte_national:'Batna',
              nom_prenom2:'Benfiala hmitchou',
              fonction:'gérant',
              tel2:'0555846255',
              e_mail2:'dummy@traxy.org',
              entre_rc:true,
              entre_nis:true,
              entre_nif:true,
              entre_ai:true,
              entre_mf:false,
              nom_prenom_tableau:'Benfiala hmitchou',
              fonction_tableau:'gérant',
              email_tableau:'dummy@traxy.org',
              password_tableau:'888888s3',
              tel_tableau:'0555846255',
              nom_prenom_signature:'Benfiala hmitchou',
              fonction_signature:'gérant',
              
              user_name:'Youcef',

        })
        await contract.save().then(
            console.log("contract saved",contract)
        )

        await customerModel.findByIdAndUpdate(customer_id,{$push : {contracts : contract}})
        const customer = await customerModel.findById(customer_id)
        if(customer!==null){
            res.status(200).json({
                status:"Success",
                customer,
                contract
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

router.post('/addcontract/:customerID', async (req,res)=>{
    try {
        const customer_id = req.params.customerID
        
        let injectedID = 0
            if(await contractModel.countDocuments()>0){
                const lastID = await contractModel.find().sort({_id:-1}).limit(1)
                console.log(lastID[0]._id)
                
                if(lastID[0]!== undefined){
                    injectedID = lastID[0]._id
                }
            }
        const contract = new contractModel({
              _id: (injectedID+1),
              renouvelement :req.body.renouvelement,
              nouveau_abonnement :req.body.nouveau_abonnement,
              n_compte_client : req.body.n_compte_client,
              code_vendeur:req.body.code_vendeur,
              boutique:req.body.boutique,
              raison_sociale :req.body.raison_sociale,
              spa : req.body.spa,
              sarl : req.body.sarl,
              eurl:req.body.eurl,
              autreType : req.body.autreType,
              n_registre_commerce:req.body.n_registre_commerce,
              date_creation_rc: new Date(req.body.date_creation_rc),
              n_identite_fiscale:req.body.n_identite_fiscale,
              n_article_imposition:req.body.n_article_imposition,
              secteur_activite : req.body.secteur_activite,
              nombre_vehicule:req.body.nombre_vehicule,
              adresse:req.body.adresse,
              code_postal:req.body.code_postal,
              commune:req.body.commune,
              wilaya:req.body.wilaya,
              tel:req.body.tel,
              fax:req.body.fax,
              e_mail:req.body.e_mail,
              n_compte_bancaire:req.body.n_compte_bancaire,
              nom_banque:req.body.nom_banque,
              agence:req.body.agence,
              adresse_banque:req.body.adresse_banque,
              nom_prenom:req.body.nom_prenom,
              representation_legale:req.body.representation_legale,
              mondataire:req.body.mondataire,
              date_naissance:new Date(req.body.date_naissance),
              nationalite:req.body.nationalite,
              cni:req.body.cni,
              passeport:req.body.passeport,
              delegation_mondat:req.body.delegation_mondat,
              n_piece_identite:req.body.n_piece_identite,
              date_emition_carte_national:new Date(req.body.date_emition_carte_national),
              lieu_emission_carte_national:req.body.lieu_emission_carte_national,
              nom_prenom2:req.body.nom_prenom2,
              fonction:req.body.fonction,
              tel2:req.body.tel2,
              e_mail2:req.body.e_mail2,
              entre_rc:req.body.entre_rc,
              entre_nis:req.body.entre_nis,
              entre_nif:req.body.entre_nif,
              entre_ai:req.body.entre_ai,
              entre_mf:req.body.entre_mf,
              nom_prenom_tableau:req.body.nom_prenom_tableau,
              fonction_tableau:req.body.fonction_tableau,
              email_tableau:req.body.email_tableau,
              password_tableau:req.body.password_tableau,
              tel_tableau:req.body.tel_tableau,
              nom_prenom_signature:req.body.nom_prenom_signature,
              fonction_signature:req.body.fonction_signature,
              
              user_name:req.body.user_name,
              fonction_signature_user:req.body.fonction_signature_user

        })
        await contract.save().then(
            console.log("contract saved",contract)
        )

        await customerModel.findByIdAndUpdate(customer_id,{$push : {contracts : contract}})
        const customer = await customerModel.findById(customer_id)
        if(customer!==null){
            res.status(200).json({
                status:"Success",
                customer,
                contract
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

router.get('/getContract/:id',async (req,res) =>{
    try{
        const id = req.params.id
        const contract = await contractModel.findById(id)
        console.log(contract)
        if(contract!==null){
            res.status(200).json({
                status:"Success",
                contract
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

router.get('/getCustomersContracts/:id',async (req,res) =>{
    try{
        const id = req.params.id
        const customer = await customerModel.findById(id)
        console.log(customer)
        if(customer!==null){
            res.status(200).json({
                status:"Success",
                Contracts : customer.contracts
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

router.put('/updatecontract/:customerID/:id',async (req,res) =>{
    try{
        const id = req.params.id
        const customerId= req.params.customerID
        const oldversion = await contractModel.findByIdAndUpdate(id,{$set : req.body,})
        await customerModel.updateOne({_id:customerId},{$pull:{contracts:oldversion}})
        const contract = await contractModel.findById(id)
        await customerModel.updateOne({_id:customerId},{$push:{contracts:contract}})
        const customer = await customerModel.findById(customerId)
        console.log(contract)
        if(contract!==null){
            res.status(200).json({
                status:"Success",
                contract,
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

router.delete('/deletecontract/:customerID/:id',async (req,res) =>{
    try{
        const id = req.params.id
        const customerID = req.params.customerID
        const contract = await contractModel.findByIdAndDelete(id)
        await customerModel.updateOne({_id:customerID},{$pull:{contracts:contract}})

        if(contract!==null){
            res.status(200).json({
                status:"Success",
                contract
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