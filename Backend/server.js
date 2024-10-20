import express from 'express'
import dotenv from 'dotenv/config.js'
import mongoose from 'mongoose'
import cors from 'cors'
import {connectToDb} from './Config/connectToDB.js'
import cookieParser from 'cookie-parser'
import UserRouter from './Routes/userProfileRoute.js'
import ListingRouter from './Routes/listingRoute.js'
import paymentRouter from './Routes/paymentRoute.js'
import bookingRouter from './Routes/bookingRoute.js'


const allowedOrigins = [
    'http://localhost:5173', 
    'http://localhost:3000',
    'https://broker-alpha.vercel.app',
    'https://task-management-n5xp8ah04-ganesh-patels-projects.vercel.app',
    'https://task-management-ecru-chi.vercel.app'
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
app.use('/api/listing',ListingRouter);
app.use('/api/payment',paymentRouter);
app.use('/api/bookings',bookingRouter);

const PORT=process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});