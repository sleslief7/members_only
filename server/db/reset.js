require('dotenv').config();
const { Client } = require('pg');

const SQL = `
  DROP TABLE IF EXISTS users, posts;
`;

async function seedDatabase() {
  console.log('Dropping tables');
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('Tables dropped successfully!');
}

seedDatabase();
