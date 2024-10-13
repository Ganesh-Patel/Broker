import {set,connect} from 'mongoose'


export const connectToDb=async()=>{
    set("strictQuery",false)
    try {
        const conn=await connect(process.env.MONGO_URI,{dbName: process.env.DB })
        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {
        console.log(error)
        
    }

}