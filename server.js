const express=require("express");
const mongoose=require("mongoose")
const dotenv=require("dotenv");
const bodyParser=require("body-parser");
const router=require("./routes/index");
const cors=require("cors")
const { default: config } = require("./config");
const app=express();
app.use(express.json())
dotenv.config()
const mongodbUrl=process.env.MONGODB_URL;
app.use("/api",router);
app.get("/",(req,res)=>{
    console.log(req.body)
    res.send("hy")
})
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
mongoose.connect(mongodbUrl,{
    useNewUrlParser:true
}).then(data=>console.log('database connected'))
.catch (error=>console.log(error.reason));

app.listen(3000,()=>{
    console.log('server is connected')
})
