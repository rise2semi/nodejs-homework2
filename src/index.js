const express = require('express');
const app = express();
require('dotenv').config();
// It could be splitted into .env file and loaded with something like dotenv
// const port = 3200;
const { NODE_PORT } = process.env;

const userRouter = require('./user/routes');

app.use(express.json());
app.use('/user', userRouter);

app.listen(NODE_PORT, () => {
    console.log(`App listening port ${NODE_PORT}`);
});
