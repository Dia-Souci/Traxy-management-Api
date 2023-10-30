const Mongoose = require('mongoose')
const annexeSchema = new Mongoose.Schema(
    {
      _id : {
        type: Number,
        default : 1,
        unique : true,
        required : true,
      },
      renouvelement :{
        type : Boolean,
        required:true
      },
      nouveau_abonnement :{
        type : Boolean,
        required:true
      },
      n_compte_client :{
        type : String,
        required:true
      },
      code_vendeur:{
        type:Number,
        required:true
      },
      boutique:{
        type:String,
        required : true ,
        default: "Batna"
      },
      raison_sociale :{
        type:String,
        rquired : true
      },
      tel:{
        type:String,
      },
      nom_prenom:{
        type:String,
        required:true
      },
      representation_legale:{
        type:Boolean,
        default:false
      },
      mondataire:{
        type:Boolean,
        default:true
      },
      cni:{
        type:Boolean,
        default:false
      },
      passeport:{
        type:Boolean,
        default:false
      },
      delegation_mondat:{
        type:Boolean,
        default:false
      },
      n_piece_identite:{
        type:String,
        required:true
      },
      date_emition_carte_national:{
        type:Date
      },
      lieu_emission_carte_national:{
        type:String,
      },
      bon_commande:{
        type:Boolean,
        default:false
      },
      autre_a_preciser:{
        type:String,
        default:''
      },
      nombredegpsactuelle:{
        type:Number,
      },
      nombredegpsajouter:{
        type:Number,
      },
      nombredegpstotall:{
        type:Number,
      },
      offre_basic:{
        type:Boolean,
        default:true
      },
      offre_standard:{
        type:Boolean,
        default:false
      },
      offre_professionel:{
        type:Boolean,
        default:false
      },
      nom_prenom_signature:{
        type:String,
        required:true
      },
      fonction_signature:{
        type:String,
        required:true
      },
      
      user_name:{
        type:String,
        required:true
      },
      fonction_signature_user:{
        type:String,
        default:'Commerciale'
      },
      vehicules:{
        type:Array,
        default:[]
      }
 

      
    },
  { timestamps: true }
  );
  module.exports = Mongoose.model("annexe", annexeSchema);
  