const express = require('express');
const mongoose = require('mongoose');
const booksRoute = require('./routes/books');
const winston = require('winston');

const app = express();
const port = 3000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// create a logger
const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({all: true})
      )
    }),
    new winston.transports.File({ filename: 'error.log', level: 'error' })
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'exceptions.log' })
  ]
});

// routes
app.use('/api/books', booksRoute);

// connect to mongodb atlas
mongoose
  .connect("mongodb+srv://admin-victor:Test123@cluster0.ucxvmno.mongodb.net/booksdb?retryWrites=true&w=majority", {useNewUrlParser: true})
  .then(() => {
    logger.info("Connected to MongoDB Atlas.");
}).catch(error => {
    logger.error(error.message);
});

app.listen(port, () => {
  logger.info(`Example app listening on port ${port}`);
});