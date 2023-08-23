import { Request, Response } from "express";
import { AppDataSource } from "./config/db";

const express = require('express');
const app = express();
const port = 8083;

const { swaggerServe, swaggerSetup } = require('./Swagger/swaggerConfig')

app.get("/user", (req: Request, res: Response) => {
    res.send('results');
});

app.use("/api-docs", swaggerServe, swaggerSetup);


AppDataSource.initialize().then(() => {
    console.log("Connected to Postgres Database")

    app.listen(port, () => {
        console.log(`Server listening on port http://${port}`)
    })

}).catch((error) => {
    console.log('Database Connection Failed : ', error)
})
