import { Request, Response } from "express";

const express = require('express');
const app = express(); 
const port = 8083;  

const { swaggerServe, swaggerSetup } = require('./Swagger/swaggerConfig')
  
app.get("/user",(req:Request,res:Response)=>{ 
    res.send('results'); 
});

app.use("/api-docs", swaggerServe, swaggerSetup); 

app.listen(port,()=>{
    console.log(`App is listening at http://localhost:${port}`);
})
