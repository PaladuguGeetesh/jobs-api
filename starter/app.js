require('dotenv').config();
require('express-async-errors');
const express=require('express');
const app=express();
const cors=require('cors');

//database connection
const connectDB=require('./db/connect');

//cors
app.use(cors());

//routers
const authRouter=require('./routes/auth');
const jobsRouter=require('./routes/jobs');

//express middleware
app.use(express.json());


//custom middleware
const authenticationMiddleware=require('./middleware/authentication');
const errorHandlerMiddleware=require('./middleware/error-handler');
const notFound=require('./middleware/not-found');


app.use('/api/v1/auth',authRouter);
app.use('/api/v1/jobs',authenticationMiddleware,jobsRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);




//setting up port and establishing database connection
const port=process.env.PORT||3000;

const start=async()=>{
  try{
    await connectDB(process.env.MONGO_URI);
    app.listen(port,()=>{
      console.log(`app is listening on port ${port}`);
    })
  }catch(err){
    console.log(err);
  }
};

start();