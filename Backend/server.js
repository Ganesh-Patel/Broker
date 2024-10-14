import express from 'express'
import dotenv from 'dotenv/config.js'
import mongoose from 'mongoose'
import cors from 'cors'
import {connectToDb} from './Config/connectToDB.js'
import cookieParser from 'cookie-parser'
import UserRouter from './Routes/userProfileRoute.js'


const allowedOrigins = [
    'http://localhost:5173', 
    '*' 
  ];
  
  const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  };


const app=express();
app.use(cors(corsOptions));
app.use(cookieParser())
app.use(express.json())
app.use('/profile-picture', express.static("profilePics"));
app.use(express.urlencoded({ extended: true }));
connectToDb();

app.use('/api/user',UserRouter);

const PORT=process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.status) {
      res.status(err.status).json({ message: err.message });
  } else {
      res.status(500).json({ message: 'Internal Server Error' });
  }
});