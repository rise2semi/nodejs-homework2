const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const loggingFormat = printf((config) => {
    return `${config.timestamp} ${config.level}: ${config.message}`;
});

const logger = createLogger({
    format: combine(
        timestamp(),
        loggingFormat
    ),
    transports: [
        new transports.Console()
    ]
});

module.exports = logger;
