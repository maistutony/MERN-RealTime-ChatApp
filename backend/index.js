//mongoDB connection and server creation
const express = require('express')
const mongoose=require("mongoose");
const app = express()
const usersRoutes=require("./routes/UsersRoutes")
require("dotenv").config();
const cors=require("cors")

mongoose.set("strictQuery", true);
//MongoDB connection 
mongoose.connect(process.env.URL_STRING, {
  useNewUrlParser: true
}).then(
  console.log("connected to db")
).catch((err)=>{
  console.log(err)
})
//middlewares
app.use(cors());
app.use(express.json())
//router middlewares
app.use("/",usersRoutes)
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
});