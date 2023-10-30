const Mongoose = require('mongoose')
const contractSchema = new Mongoose.Schema(
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
      spa:{
        type:Boolean,
        default:false
      },
      sarl:{
        type:Boolean,
        default:false
      },
      eurl:{
        type:Boolean,
        default:false
      },
      autreType:{
        type:Boolean,
        default:false
      },
      n_registre_commerce:{
        type:String,
        required:true
      },
      date_creation_rc:{
        type:Date,
      },
      n_identite_fiscale:{
        type:String,
        required:true
      },
      n_article_imposition:{
        type:String
      },
      secteur_activite:{
        type:String,
        default:"Transport"
      },
      nombre_vehicule:{
        type:Number,
        default:1
      },
      adresse:{
        type:String
      },
      code_postal:{
        type:String
      },
      commune:{
        type:String,
      },
      wilaya:{
        type:String,
      },
      tel:{
        type:String,
      },
      fax:{
        type:String,
      },
      e_mail:{
        type:String,
      },
      n_compte_bancaire:{
        type:String
      },

      nom_banque:{
        type:String
      },
      
      agence:{
        type:String
      },
      adresse_banque:{
        type:String
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
      date_naissance:{
        type:Date,
      },
      nationalite:{
        type:String
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
      nom_prenom2:{
        type:String,
        required:true
      },
      fonction:{
        type:String
      },
      tel2:{
        type:String,
      },
      e_mail2:{
        type:String,
      },
      entre_rc:{
        type :Boolean
      },
      entre_nis:{
        type :Boolean
      },
      entre_nif:{
        type :Boolean
      },
      entre_ai:{
        type :Boolean
      },
      entre_mf:{
        type :Boolean
      },
      nom_prenom_tableau:{
        type:String,
        required:true
      },
      fonction_tableau:{
        type:String,
        required:true
      },
      email_tableau:{
        type:String,
        required:true
      },
      password_tableau:{
        type:String,
        required:true
      },
      tel_tableau:{
        type:String,
        required:true
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
 

      
    },
  { timestamps: true }
  );
  module.exports = Mongoose.model("contract", contractSchema);
  