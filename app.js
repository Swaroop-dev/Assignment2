//dependices

const mongoose=require("mongoose")
const express=require("express")
const bodyParser=require("body-parser")
const  cors=require("cors")
const cookieParser=require("cookie-parser")
require('dotenv').config()



//database connection
const app=express()
const port=process.env.PORT||5000

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log('DB CONNECTED')
}).catch(()=>{
    console.log('..IS CONNECTING')
})


//routes
const authRoutes=require("./routes/auth")
const userRoutes=require("./routes/user")



app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())

app.use("/api",authRoutes)
app.use("/api",userRoutes)



app.listen(port,()=>{
  console.log(`app is running at port number ${port}`)})
