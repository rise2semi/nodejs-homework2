const express = require('express');
const app = express();

const userRouter = require('./routers/user-router');
const groupRouter = require('./routers/group-router');
const errorHandler = require('./middlewares/error-handler');
const expressLogger = require('./config/express-logger');
const expressErrorLogger = require('./config/express-error-logger');

require('dotenv').config();

const { NODE_PORT } = process.env;

app.use(expressLogger);
app.use(express.json());
app.use('/user', userRouter);
app.use('/group', groupRouter);
app.use(errorHandler);
app.use(expressErrorLogger);

process.on('unhandledRejection', (reason, promise) => {
    console.error(reason, 'Unhandled Rejection at Promise', promise);
}).on('uncaughtException', error => {
    console.error(error, 'Uncaught Exception thrown');
});

app.listen(NODE_PORT, () => {
    console.log(`App listening port ${NODE_PORT}`);
});
