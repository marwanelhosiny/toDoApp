import mongoose from "mongoose";

const db_connection=async()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/v-3')
    .then(()=>{console.log('db connected successfully')})
    .catch((err)=>{console.log('db connection failed',err)})
}



export default db_connection