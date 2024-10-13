import express from 'express'
import dotenv from 'dotenv/config.js'
import mongoose from 'mongoose'
import cors from 'cors'
import {connectToDb} from './Config/connectToDB.js'


const app=express();
const port=process.env.PORT || 3000;


connectToDb();

app.use('/',(req,res)=>{
    res.status(200).json({message:"App running Succesfully"});
})

app.listen(port,()=>{
    console.log('server started at port ',port)
})