const express = require('express');
const expressWinston = require('express-winston');
const winston = require('winston');
const app = express();

const userRouter = require('./routers/user-router');
const groupRouter = require('./routers/group-router');

require('dotenv').config();

const { NODE_PORT } = process.env;

app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
    )
}));

app.use(express.json());
app.use('/user', userRouter);
app.use('/group', groupRouter);

app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}));

process.on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
}).on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown', err);
});

app.listen(NODE_PORT, () => {
    console.log(`App listening port ${NODE_PORT}`);
});
