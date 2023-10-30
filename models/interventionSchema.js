const Mongoose = require('mongoose')
const InterventionSchema = new Mongoose.Schema(
    {
      intervention_report: {
        type:String,
        required:true
      },
      intervention_date:{
        type:Date
      }
      
    },
  { timestamps: true }
  );
  module.exports = Mongoose.model("intervention", InterventionSchema);
  