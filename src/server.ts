import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { createServer } from "node:http";
import { Server } from "socket.io";

import { Constants, NodeEnv, Logger } from './utils'
import { router } from './router'
import { ErrorHandling } from './utils/errors'

import swaggerJsdoc from "swagger-jsdoc";
const swaggerUi = require("swagger-ui-express")

const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    //TODO: test the following:
    // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    // allowedHeaders: ['*'],
    // credentials: true,
    // exposedHeaders: ["*"],
  }});

import 'utils/socket.io'

// Set up Swagger
  const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "TwitterExample Express API with Swagger",
        version: "0.1.0",
        description:
          "In this example you'll find an already setted up express server with some existing endpoints, authentication, error handling and more.",
      },
      servers: [
        {
          url: "http://localhost:8080",
        },
      ],
    },
    apis: ["./**/*.ts"],
  };
  
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );
  


// Set up request logger
if (Constants.NODE_ENV === NodeEnv.DEV) {
  app.use(morgan('tiny')) // Log requests only in development environments
}

// Set up request parsers
app.use(express.json()) // Parses application/json payloads request bodies
app.use(express.urlencoded({ extended: false })) // Parse application/x-www-form-urlencoded request bodies
app.use(cookieParser()) // Parse cookies

// Set up CORS
app.use(
  cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['*'],
    credentials: true,
    exposedHeaders: ["*"],
  })
)

app.use('/api', router)

app.use(ErrorHandling)

httpServer.listen(Constants.PORT, () => {
  Logger.info(`Server listening on port ${Constants.PORT}`)
})

 export { httpServer, app, io }