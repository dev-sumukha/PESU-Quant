import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { connectDB } from './db/connectDB.js';

import adminRoutes from './routes/admin.routes.js';
import questionRoutes from './routes/question.routes.js'
import studentRoutes from './routes/student.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();

const corsOptions = {
    origin:'http://localhost:5173',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// If credentials is to true I can send the cookies to cross-origin website

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use('/api/auth/admin',adminRoutes);
app.use('/api/question/admin',questionRoutes);
app.use('/api/auth/student',studentRoutes);
app.use('/api/auth/user',userRoutes);


connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('Server started');
    });  
});

  