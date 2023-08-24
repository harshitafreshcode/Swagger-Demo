import { Request, Response } from "express";
import { AppDataSource } from "./config/db";
import routes from "./routes/routes";
import swaggerSpec1 from "./Swagger/swaggerConfig";

const express = require('express');
const app = express();
const port = 8083;

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

console.log(swaggerSpec1, 'swaggerSpec1');
app.use('/', routes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec1));


AppDataSource.initialize().then(() => {
    console.log("Connected to Postgres Database")

    app.listen(port, () => {
        console.log(`Server listening on port http://${port}`)
    })

}).catch((error) => {
    console.log('Database Connection Failed : ', error)
})
