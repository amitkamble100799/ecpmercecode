import  express  from "express"; 
import  colors from "colors";
import dotenv from "dotenv"
import morgan from "morgan";
import connectDb from "./config/db.js";
import authRoute from './routes/authRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import productroute from './routes/productroute.js'
import cors from 'cors'
//configure
dotenv.config()

//database config
connectDb()

const app=express()

//midle ware
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
//routes
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/category',categoryRoute)
app.use('/api/v1/product',productroute)


app.get('/',(req,res)=>{
res.send({
    msg:" Wel-come TO E-Commerce website "
})
})

const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server Running on ${process.env.DEV_MODE} mode on ${PORT}`.bgWhite.red);
})