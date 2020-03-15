const expressWinston = require('express-winston');
const winston = require('winston');

module.exports = expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
    )
});
