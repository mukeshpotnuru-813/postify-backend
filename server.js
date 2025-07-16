const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const postRoute = require('./routes/posts');
const commentRoute = require('./routes/comments');
const userRoute = require('./routes/user');

const validateJWT = require('./Util/authMiddleware');


// 1 step
dotenv.config();  //configure dotenv to access .env file.(need better understanding)
connectDB();
const app = express();


app.use(express.json()) // to read json files.

app.use('/mukesh/posts',validateJWT,postRoute);
app.use('/mukesh/comments',validateJWT,commentRoute)
app.use('/mukesh/user',userRoute);


const PORT = process.env.PORT || 5000; // defining port. if we defined a PORT in .env file then it will take from it or else it will use 5000 porrt.

app.listen(PORT,()=>{
    console.log('Server is running');
})

const cors = require('cors');
app.use(cors({
    origin: 'https://postify-frontend-1cls.onrender.com', // or your frontend URL
    credentials: true
}));
// app.listen is used to run the app.(it tells app please run.)
