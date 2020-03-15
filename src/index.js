const express = require('express');
const app = express();
const cors = require('cors');

const userRouter = require('./routers/user-router');
const groupRouter = require('./routers/group-router');
const loginRouter = require('./routers/login-router');
const errorHandler = require('./middlewares/error-handler');
const expressLogger = require('./config/express-logger');
const expressErrorLogger = require('./config/express-error-logger');
const auth = require('./middlewares/auth');

require('dotenv').config();

const { NODE_PORT } = process.env;

app.use(cors());
app.use(expressLogger);
app.use(express.json());
app.use('/user', auth, userRouter);
app.use('/group', auth, groupRouter);
app.use('/login', loginRouter);
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
