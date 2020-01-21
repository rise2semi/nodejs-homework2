const express = require('express');
const app = express();
const port = 3200;

const userRouter = require('./user/routes');

app.use(express.json());
app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`App listening port ${port}`);
});
