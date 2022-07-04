import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';

import postRoutes from './routes/posts.js';

//http://localhost:5000/posts

const app = express();


app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));

app.use(cors());

app.use('/posts', postRoutes); // added a prefix of posts, should come after cors

const CONNECTION_URL = 'mongodb+srv://rohit_07:12345678987654321@cluster0.j0wcz1u.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=> app.listen(PORT,()=>console.log(`Server Running on port : ${PORT}`)))
    .catch((error)=> console.log(error.message));

//mongoose.set('useFindAndModify', false);