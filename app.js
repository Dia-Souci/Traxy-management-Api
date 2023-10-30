const express = require('express')
const colors = require("colors");
const mongoose = require("mongoose");
const userRoute =require('./routes/userRoute')
const customerRoute = require('./routes/customerRoute')
const customerVehiculeRoute = require('./routes/customerVehiculeRoute')
const contractRoute = require('./routes/contractRoute')
const annexeRoute = require("./routes/annexeRoute")
const interventionRoute = require('./routes/interventionRoute')
const AuthRoute = require('./routes/AuthRoute')
const app = express();


const cors = require("cors");

app.use(
    cors({
      origin: ["http://localhost:3000","https://traxy-management-client.vercel.app"],
    })
);


const DBurl = process.env.MONGO_URI;
const options = {
  autoIndex: false, 
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000, 
  family: 4 
};

mongoose.connect(DBurl, options).then(
  () => { console.log(`Successfully conncted to mongoDB database`.cyan.bold); },
  err => { console.log(err) }
);



app.use(express.json());

app.use('/api/auth',AuthRoute)
app.use('/api/users',userRoute)
app.use('/api/customers',customerRoute)
app.use('/api/customervehicules',customerVehiculeRoute)
app.use('/api/contracts/',contractRoute)
app.use('/api/annexes/',annexeRoute)
app.use('/api/interventions',interventionRoute)

app.use("/", (req, res, next) => {
    res.status(404).json("page not hello");
    next();
});
  










let Port = 5000;
app.listen(
  Port,
  console.log(`Server is running on port ${Port}...`.yellow.bold)
);


