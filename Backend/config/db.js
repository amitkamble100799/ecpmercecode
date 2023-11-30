import mongoose from "mongoose";
import  colors from "colors";
const connectDb= async()=>{
try{
const conn=await mongoose.connect(process.env.MONGO_URL)
console.log(`db coneected ${conn.connection.host}`.bgMagenta.white)
} catch(error){
console.log(`eror ${error}`.bgRed.white)
}
}
export default connectDb