const Mongoose = require('mongoose')

const vehiculeSchema = new Mongoose.Schema(
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
      trackerModel:{
        type:String,
        required:true,
      },
      imei:{
        type:String,
        required:true,
      },
      sim_number:{
        type:String,
        required:true
      },
      matricule:{
        type:String,
        required : true,
      },
      num_chassis:{
        type : String,
        default : "0x0xxx0",
      },
      activation_date:{
        type : Date,
        required:true,
        default: new Date()
      },
      next_payemnt:{
        type : Date,
        default: new Date()
      }
      ,
      activation_timer:{
        type:Number,
        default:12
      },
      plan:{
        type:Number,
        default : 0.00,
        required:true
      },
      status:{
        type:String,
        default:'active'
      }
      ,
      owner_ID :{
        type: Number,
        required : true,
      },
      new : {
        type: Boolean,
        default: true
      }
    },
  { timestamps: true }
  );
  module.exports = Mongoose.model("vehicule", vehiculeSchema);;
  