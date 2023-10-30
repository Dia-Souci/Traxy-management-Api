const Mongoose = require('mongoose')
const customerSchema = new Mongoose.Schema(
    {
      _id : {
        type: Number,
        default : 1,
        unique : true,
        required : true,
      },
      name:{
        type:String,
        required:true,
      },
      phone:{
        type:String,
        required:true,
      },
      email:{
        type:String,
        required:true,
      },
      password:{
        type:String,
        default:'888888s3',
        required:true
      },
      vehicule_number:{
        type:Number,
        default:0,
        required : true,
      },
      balance:{
        type : Number,
        default : 0.00,
      },
      vehicules:{
        type: Array,
        default : []
      },
      contracts :{    //to add in a schema
        type : Array,
        default : []
      }
      ,
      annexes :{      //to add in a schema
        type : Array,
        default : []
      }
      ,
      interventions :{     //to add in a schema
        type : Array,
        default : []
      }
      ,
      createdBy :{
        type : String,
        default : 'admin'
      }
    },
  { timestamps: true }
  );
  module.exports = Mongoose.model("customer", customerSchema);
  