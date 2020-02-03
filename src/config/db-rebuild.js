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

function dropUsersTable() {
    return client.query('DROP TABLE Users')
        .then(() => console.log('Users table successfully deleted'))
        .catch((err) => console.error('Users table cannot be deleted', err.stack));
}

function dropGroupsTable() {
    return client.query('DROP TABLE Groups')
        .then(() => console.log('Griups table successfully deleted'))
        .catch((err) => console.error('Groups table cannot be deleted', err.stack));
}

function createUsersTable() {
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

function createGroupsTable() {
    return client.query(`
        CREATE TABLE Groups (
            id SERIAL,
            name varchar(30) NOT NULL,
            permissions varchar(30) NOT NULL
        )`)
        .then(() => console.log('Groups table successfully created'))
        .catch((err) => console.error('Groups table cannot be created', err.stack));
}

function insertUsersData() {
    return client.query(`
        INSERT INTO Users (login, password, age)
        VALUES
            ('Borys', 'Semerenko', 30),
            ('Morys', 'Semerenko', 40),
            ('Dorys', 'Semerenko', 20)`)
        .then(() => console.log('Default users successfully created'))
        .catch((err) => console.error('Default users cannot be created', err.stack));
}

function insertGroupsData() {
    return client.query(`
        INSERT INTO Groups (name, permissions)
        VALUES
            ('Authors', 'Write'),
            ('Users', 'Read'),
            ('Admins', 'Delete')`)
        .then(() => console.log('Default groups successfully created'))
        .catch((err) => console.error('Default groups cannot be created', err.stack));
}

function closeConnection() {
    return client
        .end()
        .then(() => console.log('Connection to database successfully closed'))
        .catch((err) => console.error('Connection close error', err.stack));
}

(async function dbRebuild() {
    await openConnection();
    await dropUsersTable();
    await dropGroupsTable();
    await createUsersTable();
    await createGroupsTable();
    await insertUsersData();
    await insertGroupsData();
    await closeConnection();
}());
