const { Client } = require('pg');

require('dotenv').config();
const { DB_CONNECTION } = process.env;

const client = new Client({
    connectionString: DB_CONNECTION
});

function openConnection() {
    return client
        .connect()
        .then(() => console.log('Connection to database successfully established'))
        .catch((err) => console.error('Connection error', err.stack));
}

function dropTable() {
    return client.query('DROP TABLE Users')
        .then(() => console.log('Users table successfully deleted'))
        .catch((err) => console.error('Users table cannot be deleted', err.stack));
}

function createTable() {
    return client.query(`
        CREATE TABLE Users (
            id SERIAL,
            isDeleted boolean NOT NULL DEFAULT false,
            login varchar(30) NOT NULL,
            password varchar(30) NOT NULL,
            age int NOT NULL
        )`)
        .then(() => console.log('Users table successfully created'))
        .catch((err) => console.error('Users table cannot be created', err.stack));
}

function insertData() {
    return client.query(`
        INSERT INTO Users (login, password, age)
        VALUES
            ('Borys', 'Semerenko', 30),
            ('Morys', 'Semerenko', 40),
            ('Dorys', 'Semerenko', 20)`)
        .then(() => console.log('Default users successfully created'))
        .catch((err) => console.error('Default users cannot be created', err.stack));
}

function closeConnection() {
    return client
        .end()
        .then(() => console.log('Connection to database successfully closed'))
        .catch((err) => console.error('Connection close error', err.stack));
}

(async function dbRebuild() {
    await openConnection();
    await dropTable();
    await createTable();
    await insertData();
    await closeConnection();
}());
