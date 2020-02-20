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
    return client.query('DROP TABLE users')
        .then(() => console.log('Users table successfully deleted'))
        .catch((err) => console.error('Users table cannot be deleted', err.stack));
}

function dropGroupsTable() {
    return client.query('DROP TABLE groups')
        .then(() => console.log('Groups table successfully deleted'))
        .catch((err) => console.error('Groups table cannot be deleted', err.stack));
}

function dropUserGroupTable() {
    return client.query('DROP TABLE usergroup')
        .then(() => console.log('UserGroup table successfully deleted'))
        .catch((err) => console.error('UserGroup table cannot be deleted', err.stack));
}

function createUsersTable() {
    return client.query(`
        CREATE TABLE users (
            id SERIAL,
            is_deleted boolean NOT NULL DEFAULT false,
            login varchar(30) NOT NULL,
            password varchar(30) NOT NULL,
            age int NOT NULL
        )`)
        .then(() => console.log('Users table successfully created'))
        .catch((err) => console.error('Users table cannot be created', err.stack));
}

function createGroupsTable() {
    return client.query(`
        CREATE TABLE groups (
            id SERIAL,
            name varchar(30) NOT NULL,
            permissions varchar(30) NOT NULL
        )`)
        .then(() => console.log('Groups table successfully created'))
        .catch((err) => console.error('Groups table cannot be created', err.stack));
}

function createUserGroupTable() {
    return client.query(`
        CREATE TABLE usergroup (
            id SERIAL,
            user_id int NOT NULL,
            group_id int NOT NULL
        )`)
        .then(() => console.log('UserGroup table successfully created'))
        .catch((err) => console.error('UserGroup table cannot be created', err.stack));
}

function insertUsersData() {
    return client.query(`
        INSERT INTO users (login, password, age)
        VALUES
            ('Borys', 'Semerenko', 30),
            ('Morys', 'Semerenko', 40),
            ('Dorys', 'Semerenko', 20)`)
        .then(() => console.log('Default users successfully created'))
        .catch((err) => console.error('Default users cannot be created', err.stack));
}

function insertGroupsData() {
    return client.query(`
        INSERT INTO groups (name, permissions)
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
    await dropUserGroupTable();
    await createUsersTable();
    await createGroupsTable();
    await createUserGroupTable();
    await insertUsersData();
    await insertGroupsData();
    await closeConnection();
}());
