const express = require('express');
const app = express();

const userRouter = require('./routers/user-router');

require('dotenv').config();

const { NODE_PORT } = process.env;

app.use(express.json());
app.use('/user', userRouter);

app.listen(NODE_PORT, () => {
    console.log(`App listening port ${NODE_PORT}`);
});
