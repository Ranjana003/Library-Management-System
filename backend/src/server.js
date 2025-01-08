import dotenv from 'dotenv';
dotenv.config();

import express from'express';
import cors from'cors';
import bookRouter from './Routers/book.router.js'
import userRouter from './Routers/user.router.js';

const app= express();

import { dbconnect } from './config/database.config.js';
dbconnect();

app.use(express.json());
app.use(
    cors({
        credentials: true, 
        origin: ['http://localhost:3000']
    })
);
app.use('/api/books', bookRouter);
app.use('/api/users', userRouter);


const PORT= 5000;
app.listen(PORT, ()=>{
    console.log('listening on port' + PORT);
});