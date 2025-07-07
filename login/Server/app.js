import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.routes.js';



export const app = express();
//basic stucutre
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRouter);


