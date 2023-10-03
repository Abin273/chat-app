import express from 'express';
import dotenv from 'dotenv'
dotenv.config()

const app= express()

app.get('/',async (req,res)=>{
    console.log("hi");
    res.status(200).json({"message":"success"})
})

const PORT = process.env.PORT || 8000 
app.listen(PORT,()=>{
    console.log(`server is runnig on port ${PORT}`);
})