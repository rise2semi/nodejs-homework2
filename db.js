const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgres://guipsbgn:x9f57WEcEXsWQtpkrsHoy3S2ozG5_2nB@rajje.db.elephantsql.com:5432/guipsbgn'
});

client
    .connect()
    .then(() => console.log('Connection to database successfully established'))
    .catch((err) => console.error('Connection error', err.stack));

client.query(`DROP TABLE Users`);
client.query(`
    CREATE TABLE Users (
        id SERIAL,
        isDeleted boolean NOT NULL DEFAULT false,
        login varchar(30) NOT NULL,
        password varchar(30) NOT NULL,
        age int NOT NULL
    )`)
    .then(() => console.log('Users table successfully created'))
    .catch((err) => console.error('Users table cannot be created', err.stack));

client.query(`
    INSERT INTO Users (login, password, age)
    VALUES
        ('Borys', 'Semerenko', 30),
        ('Morys', 'Semerenko', 40),
        ('Dorys', 'Semerenko', 20)`)
    .then(() => console.log('Default users successfully created'))
    .catch((err) => console.error('Default users cannot be created', err.stack));
