import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for JSONPlaceholder',
        version: '1.0.0',
    },
};

const options = {
    swaggerDefinition,
    apis: ['src/routes/routes.ts'],
};
const swaggerSpec1 = swaggerJSDoc(options);

export default swaggerSpec1