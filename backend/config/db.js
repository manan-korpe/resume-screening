import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.on("connect", () => {
  console.log(`✔️ Database ${process.env.DB_NAME} Connected successfuly`);
});

pool.on("error", (err) => {
  console.error('❌ Unexpected error on idle database client', err);
  process.exit(-1);
});

const query = (text, params) => pool.query(text, params);

export {
  pool,
  query
}