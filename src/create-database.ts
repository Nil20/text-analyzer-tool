const mysql = require('mysql2/promise');
const { exec } = require('child_process');
const util = require('util');
const dotenv = require('dotenv');

dotenv.config();

const execPromise = util.promisify(exec);

const createDatabaseAndRunMigrations = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  const dbName = process.env.DB_NAME;

  await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`);

  console.log(`Database "${dbName}" created or already exists`);
  await connection.end();

  console.log('Running migrations...');
  await execPromise('npx sequelize-cli db:migrate');
  console.log('Migrations completed');
};

createDatabaseAndRunMigrations().catch((err) => {
  console.error('Error setting up the database:', err);
});
