const Mongoose = require("mongoose");

const userSchema = new Mongoose.Schema(
  {
    _id : {
      type: Number,
      default : 1,
      unique : true,
      required : true,
    },
    username:{
      type: String,
      unique :true,
      required : true,
    },
    NSS:{
      type:Number,
      required : true,
    },
    role:{
      type:String,
      default : 'user',
      required : true,
    },
    password:{
      type : String,
      required:true,
      default : '888888s3',
    },
    boutique:{
      type:String,
      default:'Batna'
    }
    },
{ timestamps: true }
);


userSchema.statics.login = async function(username, password) {

  if (!username || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ username })
  if (!user) {
    throw Error('Incorrect username')
  }

  if ((user.password !== password) ) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = Mongoose.model("user", userSchema);
