import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
const port = process.env.PORT;

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/users',userRouter);

app.use(notFound);
app.use(errorHandler);


app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
    connectDB();
});
